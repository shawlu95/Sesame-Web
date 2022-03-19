require('dotenv').config();
const Web3 = require('web3');
const config = require('../../client/src/config.json');

// https://data-seed-prebsc-1-s1.binance.org:8545
const web3 = new Web3(process.env.NODE_URL);

const getAddress = (contract) => {
  return config[contract].address;
};

const getArtifact = (contract) => {
  return require(`../../client/src/artifacts/contracts/${contract}.sol/${contract}.json`);
};

const getContract = (contract) => {
  const artifact = getArtifact(contract);
  const address = getAddress(contract);
  return new web3.eth.Contract(artifact.abi, address);
};

module.exports = {
  getAddress,
  getContract
}