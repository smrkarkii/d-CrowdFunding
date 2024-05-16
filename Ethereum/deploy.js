const { Web3 } = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();
const campaign = require("../Ethereum/build/Campaign.json");
const campaignFactory = require("../Ethereum/build/CampaignFactory.json");

const provider = new HDWalletProvider(
  process.env.pnemonics,
  process.env.infura
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Deploying the contract from", accounts[0]);

    const contract = await new web3.eth.Contract(
      JSON.parse(campaignFactory.interface)
    )
      .deploy({ data: campaignFactory.bytecode })
      .send({ from: accounts[0], gas: "3000000" }) // Increased gas limit
      .on("transactionHash", (hash) => {
        console.log("Transaction hash:", hash);
      })
      .on("receipt", (receipt) => {
        console.log("Contract deployed at address:", receipt.contractAddress);
      });

    const contractAddress = contract.options.address;
    console.log("Contract deployed to", contractAddress);
  } catch (error) {
    console.error("An error occurred during deployment:", error);
  } finally {
    provider.engine.stop();
  }
};

deploy();

contractdeployedfactory = "0xa930efc0f0f982f8205380a243fb55ead9029d63";
