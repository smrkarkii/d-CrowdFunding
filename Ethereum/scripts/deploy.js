const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const Campaign = await hre.ethers.getContractFactory("CampaignFactory");
  const campaign = await Campaign.deploy();
  await campaign.waitForDeployment();
  console.log("Contract deployed at", campaign.target);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

//  deployed contract 0xad6a4ec89D382810d4b7EE85c2a4E8704B564a43
