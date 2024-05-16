import web3 from "./web3";
const address = "0xa930efc0f0f982f8205380a243fb55ead9029d63";

import CampaignFactory from "../Ethereum/build/CampaignFactory.json";

const contractfactory = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  address
);

export default contractfactory;
