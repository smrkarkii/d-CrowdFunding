import web3 from "./web3";
const address = "0xad6a4ec89D382810d4b7EE85c2a4E8704B564a43";

import CampaignFactory from "../Ethereum/artifacts/Contracts/Campaign.sol/CampaignFactory.json";

const contractfactory = new web3.eth.Contract(CampaignFactory.abi, address);
console.log("Contract factory ", contractfactory);
export default contractfactory;
