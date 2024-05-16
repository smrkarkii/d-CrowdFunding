const path = require("path");
const fs = require("fs-extra");
// fs-extra -- > similar to fs but with extra functins
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");

fs.removeSync(buildPath);
// to remove file or folder , deltes everything

const campaignPath = path.resolve(__dirname, "Contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);
//if it doesn't exist it creates that folder

// for (let contract in output) {
//   fs.outputJsonSync(
//     path.resolve(buildPath, contract + ".json"),
//     output[contract]
//   );
// }
for (let contractName in output) {
  const contract = output[contractName];
  console.log("Contract name", contractName);
  const contractFileName = contractName.replace(":", "") + ".json"; // Remove the colon from the contract name
  fs.outputJsonSync(path.resolve(buildPath, contractFileName), contract);
}
console.log(output);
