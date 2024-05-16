const assert = require("assert");
const { Web3 } = require("web3");
const ganache = require("ganache");
const web3 = new Web3(ganache.provider);

const campaign = require("../Ethereum/build/Campaign.json");
const campaignFactory = require("../Ethereum/build/CampaignFactory.json");

let factory;
let accounts;
let campaignInstance;
let campaignAddress;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await web3.eth
    .Contract(JSON.parse(campaignFactory.interface))
    .deploy({data:campaignFactory.bytecode})
    .send({ from: accounts[0], gas: 100000 });


 await factory.methods.createCampaign('100').send({from:accounts[0] ,gas:100000})
const address = await campaignInstance.getDeployedCampaigns().call();
campaignAddress = address[0];
campaignInstance = await web3.eth.Contract(JSON.parse(campaign.interface,campaignAddress)


});
