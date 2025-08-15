// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract OnchainSocialMixer is Ownable, ERC721 {
    using Counters for Counters.Counter;

    struct Event {
        string name;
        string baseURI;
        Counters.Counter tokenIdCounter;
        mapping(address => bool) hasMinted;
    }

    // Pricing
    uint256 public constant MINT_PRICE = 0.0015 ether; // 0.0015 ETH per ticket

    // Max NFTs per event (to avoid ID collision)
    uint256 private constant MAX_NFTS_PER_EVENT = 10000;

    // Treasury address (can be updated)
    address public treasuryWallet;

    // Events
    mapping(uint256 => Event) public events;
    Counters.Counter private eventCounter;

    // User stats
    mapping(address => uint256) public nftBalance;
    mapping(uint256 => mapping(address => bool)) public hasReceivedPOAP;

    // Events
    event EventCreated(uint256 indexed eventId, string name, string baseURI);
    event NFTMinted(address indexed user, uint256 indexed eventId, uint256 tokenId);
    event TreasuryWalletUpdated(address newWallet);
    event POAPAirdropped(address indexed recipient, uint256 indexed eventId);

    // ============= MODIFIERS =============
    modifier onlyAdmin() {
        require(msg.sender == owner(), "Only admin can call this");
        _;
    }

    // ============= CONSTRUCTOR =============
    constructor(address _treasuryWallet) ERC721("OnchainSocialMixer v2", "OSM") {
        require(_treasuryWallet != address(0), "Invalid treasury");
        treasuryWallet = _treasuryWallet;
    }

    // ============= ADMIN FUNCTIONS =============

    function createEvent(string memory name, string memory baseURI) external onlyAdmin {
        uint256 eventId = eventCounter.current();
        Event storage newEvent = events[eventId];
        newEvent.name = name;
        newEvent.baseURI = baseURI;
        eventCounter.increment();
        emit EventCreated(eventId, name, baseURI);
    }

    function updateTreasuryWallet(address _newWallet) external onlyAdmin {
        require(_newWallet != address(0), "Invalid wallet");
        treasuryWallet = _newWallet;
        emit TreasuryWalletUpdated(_newWallet);
    }

    function sendPOAPs(uint256 eventId, address[] calldata recipients) external onlyAdmin {
        require(eventId < eventCounter.current(), "Invalid event ID");
        for (uint256 i = 0; i < recipients.length; i++) {
            address user = recipients[i];
            require(!hasReceivedPOAP[eventId][user], "Already received POAP");
            hasReceivedPOAP[eventId][user] = true;
            emit POAPAirdropped(user, eventId);
        }
    }

    // ============= PUBLIC PAYABLE MINT FUNCTION =============

    /**
     * @notice Mint an NFT for a specific event (payable)
     * @param eventId The ID of the event
     */
    function mintEventNFT(uint256 eventId) external payable {
        // Check valid event
        require(eventId < eventCounter.current(), "Invalid event ID");

        // Check hasn't minted
        Event storage eventRef = events[eventId];
        require(!eventRef.hasMinted[msg.sender], "Already minted for this event");

        // Check correct ETH sent
        require(msg.value >= MINT_PRICE, "Insufficient ETH");

        // Generate globally unique token ID
        uint256 localTokenId = eventRef.tokenIdCounter.current();
        uint256 tokenId = eventId * MAX_NFTS_PER_EVENT + localTokenId;

        // Mint NFT
        _safeMint(msg.sender, tokenId);

        // Update state
        eventRef.tokenIdCounter.increment();
        eventRef.hasMinted[msg.sender] = true;
        nftBalance[msg.sender]++;

        // Send ETH to treasury
        (bool success, ) = treasuryWallet.call{value: msg.value}("");
        require(success, "Transfer failed");

        emit NFTMinted(msg.sender, eventId, tokenId);
    }

    // ============= VIEW FUNCTIONS =============

    function totalEvents() external view returns (uint256) {
        return eventCounter.current();
    }

    function hasUserMinted(uint256 eventId, address user) external view returns (bool) {
        return events[eventId].hasMinted[user];
    }

    function getUserDiscount() external view returns (uint256) {
        return nftBalance[msg.sender] > 0 ? 10 : 0; // Example: 10% discount
    }

    function verifyAdmission(uint256 eventId, address user) external view returns (bool) {
        return events[eventId].hasMinted[user] || hasReceivedPOAP[eventId][user];
    }

    // Optional: Return metadata URI
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        uint256 eventId = tokenId / MAX_NFTS_PER_EVENT;
        require(eventId < eventCounter.current(), "Invalid token");
        return events[eventId].baseURI;
    }

    // Allow owner to withdraw (fallback)
    function withdraw() external onlyAdmin {
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Withdraw failed");
    }
}