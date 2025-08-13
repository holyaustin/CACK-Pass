const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OnchainSocialMixer", function () {
  let mixer, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Mixer = await ethers.getContractFactory("OnchainSocialMixer");
    mixer = await Mixer.deploy();
    await mixer.waitForDeployment();
  });

  it("Should deploy correctly", async function () {
    expect(await mixer.getAddress()).to.be.properAddress;
    expect(await mixer.owner()).to.equal(owner.address);
  });

  it("Should create event", async function () {
    await mixer.createEvent("ETH Enugu 2025", "https://osm.events/meta/enugu/");
    expect(await mixer.totalEvents()).to.equal(1);
  });

  it("Should allow user to mint NFT", async function () {
    await mixer.createEvent("ETH Enugu 2025", "");
    await mixer.connect(addr1).mintEventNFT(0);

    expect(await mixer.hasUserMinted(0, addr1.address)).to.equal(true);
    expect(await mixer.nftBalance(addr1.address)).to.equal(1);
  });

  it("Should prevent double mint", async function () {
    await mixer.createEvent("ETH Enugu 2025", "");
    await mixer.connect(addr1).mintEventNFT(0);
    await expect(mixer.connect(addr1).mintEventNFT(0)).to.be.revertedWith("Already minted for this event");
  });

  it("Should airdrop POAP", async function () {
    await mixer.createEvent("ETH Enugu 2025", "");
    await mixer.sendPOAPs(0, [addr1.address]);

    expect(await mixer.hasReceivedPOAP(0, addr1.address)).to.equal(true);
  });

  it("Should verify admission via NFT", async function () {
    await mixer.createEvent("ETH Enugu 2025", "");
    await mixer.connect(addr1).mintEventNFT(0);

    const canAdmit = await mixer.verifyAdmission(0, addr1.address);
    expect(canAdmit).to.equal(true);
  });

  it("Should verify admission via POAP", async function () {
    await mixer.createEvent("ETH Enugu 2025", "");
    await mixer.sendPOAPs(0, [addr1.address]);

    const canAdmit = await mixer.verifyAdmission(0, addr1.address);
    expect(canAdmit).to.equal(true);
  });

  it("Should deny admission if no NFT or POAP", async function () {
    await mixer.createEvent("ETH Enugu 2025", "");
    const canAdmit = await mixer.verifyAdmission(0, addr1.address);
    expect(canAdmit).to.equal(false);
  });

  it("Should update discount", async function () {
    await mixer.updateGlobalDiscount(20);
    expect(await mixer.globalDiscountPercent()).to.equal(20);
  });

  it("Should transfer ownership", async function () {
    await expect(mixer.transferOwnership(addr1.address))
      .to.emit(mixer, "OwnershipTransferred")
      .withArgs(owner.address, addr1.address);

    expect(await mixer.owner()).to.equal(addr1.address);
  });
});