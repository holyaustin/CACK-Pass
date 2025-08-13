const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OnchainSocialMixer", function () {
  let mixer, owner, addr1, addr2, addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const Mixer = await ethers.getContractFactory("OnchainSocialMixer");
    mixer = await Mixer.deploy();
    await mixer.waitForDeployment();
  });

  it("Should create a new event", async function () {
    await mixer.createEvent("ETH Enugu 2025", "https://meta.osm.events/enugu/");
    expect(await mixer.totalEvents()).to.equal(1);
  });

  it("Should allow user to mint NFT and earn discount if prior holder", async function () {
    await mixer.createEvent("ETH Enugu 2025", "https://meta.osm.events/enugu/");

    // addr1 mints first
    await mixer.connect(addr1).mintEventNFT(0);
    expect(await mixer.nftBalance(addr1.address)).to.equal(1);

    // Set global discount
    await mixer.updateGlobalDiscount(20);
    expect(await mixer.globalDiscountPercent()).to.equal(20);

    // Check discount
    expect(await mixer.connect(addr1).getUserDiscount()).to.equal(20);
    expect(await mixer.connect(addr2).getUserDiscount()).to.equal(0);
  });

  it("Should prevent double minting", async function () {
    await mixer.createEvent("ETH Enugu 2025", "https://meta.osm.events/enugu/");
    await mixer.connect(addr1).mintEventNFT(0);
    await expect(mixer.connect(addr1).mintEventNFT(0)).to.be.reverted;
  });

  it("Should allow admin to send POAPs", async function () {
    await mixer.createEvent("ETH Enugu 2025", "");
    await mixer.sendPOAPs(0, [addr1.address, addr2.address]);

    expect(await mixer.hasReceivedPOAP(0, addr1.address)).to.equal(true);
    expect(await mixer.hasReceivedPOAP(0, addr2.address)).to.equal(true);
  });

  it("Should allow ownership transfer", async function () {
    await mixer.transferOwnership(addr1.address);
    expect(await mixer.owner()).to.equal(addr1.address);
  });
});