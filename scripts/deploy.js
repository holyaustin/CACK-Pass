const { ethers } = require("hardhat");

async function main() {
  const Mixer = await ethers.getContractFactory("OnchainSocialMixer");
  const mixer = await Mixer.deploy();

  await mixer.waitForDeployment();
  console.log("OnchainSocialMixer deployed to:", await mixer.getAddress());

  // Optional: Create first event
  const tx = await mixer.createEvent("ETH Enugu 2025", "https://meta.osm.events/enugu/");
  await tx.wait();
  console.log("Event 0 created: ETH Enugu 2025");

  // Set global discount
  await mixer.updateGlobalDiscount(15);
  console.log("Global discount set to 15%");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  