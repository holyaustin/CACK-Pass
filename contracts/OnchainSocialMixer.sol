// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract OnchainSocialMixer is Ownable, ERC721 {
    using Counters for Counters.Counter;

    // Event structure
    struct Event {
        string name;
        string baseURI;
        Counters.Counter tokenIdCounter;
        mapping(address => bool) hasMinted;
    }

    // Global discount percentage (e.g., 10 = 10%)
    uint256 public globalDiscountPercent;

    // Mapping from event ID to Event
    mapping(uint256 => Event) public events;
    Counters.Counter private eventCounter;

    // Track user's NFT count across all past events (for discount logic)
    mapping(address => uint256) public nftBalance;

    // POAP tracking: eventID → address → bool
    mapping(uint256 => mapping(address => bool)) public hasReceivedPOAP;

    // Events
    event EventCreated(uint256 indexed eventId, string name, string baseURI);
    event NFTMinted(address indexed user, uint256 indexed eventId, uint256 tokenId);
    event DiscountUpdated(uint256 newDiscountPercent);
    event POAPAirdropped(address indexed recipient, uint256 indexed eventId);


    // ============= MODIFIERS =============
    modifier onlyAdmin() {
        require(msg.sender == owner(), "Only admin can call this");
        _;
    }

    // ============= CONSTRUCTOR =============
    constructor() ERC721("OnchainSocialMixer", "OSM") {}

    // ============= ADMIN FUNCTIONS =============

    /// @notice Create a new event with its own NFT collection
    /// @param name Name of the event
    /// @param baseURI Base URI for NFT metadata
    function createEvent(string memory name, string memory baseURI) external onlyAdmin {
        uint256 eventId = eventCounter.current();
        Event storage newEvent = events[eventId];
        newEvent.name = name;
        newEvent.baseURI = baseURI;
        eventCounter.increment();
        emit EventCreated(eventId, name, baseURI);
    }

    /// @notice Update global discount percentage (e.g., 15 for 15%)
    /// @param newDiscountPercent Discount in percent (0-100)
    function updateGlobalDiscount(uint256 newDiscountPercent) external onlyAdmin {
        require(newDiscountPercent <= 100, "Discount too high");
        globalDiscountPercent = newDiscountPercent;
        emit DiscountUpdated(newDiscountPercent);
    }

    /// @notice Transfer ownership
    function transferOwnership(address newOwner) public override onlyAdmin {
        super.transferOwnership(newOwner);
        emit OwnershipTransferred(msg.sender, newOwner);
    }

    /// @notice Airdrop POAP to users after event
    /// @param eventId The event ID
    /// @param recipients List of recipient addresses
    function sendPOAPs(uint256 eventId, address[] calldata recipients) external onlyAdmin {
        for (uint256 i = 0; i < recipients.length; i++) {
            address user = recipients[i];
            require(!hasReceivedPOAP[eventId][user], "Already received POAP");
            hasReceivedPOAP[eventId][user] = true;
            emit POAPAirdropped(user, eventId);
        }
    }

    // ============= PUBLIC FUNCTIONS =============

    /// @notice Mint event NFT. Users get discount if they own any past NFTs
    /// @param eventId The event to mint for
    function mintEventNFT(uint256 eventId) external {
        // Checks
        require(eventId < eventCounter.current(), "Invalid event ID");
        Event storage eventRef = events[eventId];
        require(!eventRef.hasMinted[msg.sender], "Already minted for this event");

        // Get tokenId
        uint256 tokenId = eventRef.tokenIdCounter.current();

        // Mint NFT
        _safeMint(msg.sender, tokenId);

        // State updates
        eventRef.tokenIdCounter.increment();
        eventRef.hasMinted[msg.sender] = true;
        nftBalance[msg.sender]++;

        emit NFTMinted(msg.sender, eventId, tokenId);
    }

    /// @notice Check discount for user based on previous NFT ownership
    /// @return Final discount percent (either global or enhanced if eligible)
    function getUserDiscount() external view returns (uint256) {
        return nftBalance[msg.sender] > 0 ? globalDiscountPercent : 0;
    }

    /// @notice Check if user minted for a specific event
    /// @param eventId Event ID
    /// @param user Address
    /// @return bool
    function hasUserMinted(uint256 eventId, address user) external view returns (bool) {
        return events[eventId].hasMinted[user];
    }

    /// @notice Get total number of events created
    function totalEvents() external view returns (uint256) {
        return eventCounter.current();
    }

    /// ✅ NEW: On-Chain Verification for QR-Based Admission
    /// @notice Verify if a user can attend an event (owns NFT ticket or POAP)
    /// @param eventId The event ID
    /// @param user The attendee's address
    /// @return bool True if admitted
    function verifyAdmission(uint256 eventId, address user) external view returns (bool) {
        return events[eventId].hasMinted[user] || hasReceivedPOAP[eventId][user];
    }

    // ============= INTERNAL OVERRIDES =============

    function _baseURI() internal pure override returns (string memory) {
        return ""; // Custom per-token URI via metadata
    }
}