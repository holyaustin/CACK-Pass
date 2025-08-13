const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  const Mixer = await ethers.getContractFactory("OnchainSocialMixer");
  const mixer = await Mixer.deploy();
  await mixer.waitForDeployment();

  console.log("✅ OnchainSocialMixer deployed to:", await mixer.getAddress());

  // Create ETH Enugu 2025 event
  const tx1 = await mixer.createEvent("ETH Enugu 2025", "https://osm.events/meta/enugu/");
  await tx1.wait();
  console.log("🎉 Event 0 created: ETH Enugu 2025");

  // Set discount
  const tx2 = await mixer.updateGlobalDiscount(15);
  await tx2.wait();
  console.log("💸 Global discount set to 15%");

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