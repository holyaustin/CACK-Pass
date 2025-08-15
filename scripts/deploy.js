const { ethers } = require("hardhat");

async function main() {
  const TREASURY_WALLET = "0x2c3b2B2325610a6814f2f822D0bF4DAB8CF16e16";
  if (!TREASURY_WALLET) {
    throw new Error("Missing TREASURY_WALLET");
  }

  console.log("Deploying OnchainSocialMixer...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  const Mixer = await ethers.getContractFactory("OnchainSocialMixer");
  const mixer = await Mixer.deploy(TREASURY_WALLET);
  await mixer.waitForDeployment();

  console.log("✅ OnchainSocialMixer deployed to:", await mixer.getAddress());
{/**
  // Create ETH Enugu 2025 event
  const tx1 = await mixer.createEvent("ETH Enugu 2025", "https://osm.events/meta/enugu/");
  await tx1.wait();
  console.log("🎉 Event 0 created: ETH Enugu 2025");

  // Set discount
  const tx2 = await mixer.updateGlobalDiscount(15);
  await tx2.wait();
  console.log("💸 Global discount set to 15%");
 */}
  // Print address for frontend
  console.log("\n📌 Contract Address (Save this):");
  console.log(await mixer.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });