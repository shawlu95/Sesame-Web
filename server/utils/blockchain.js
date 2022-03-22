require('dotenv').config();
const Web3 = require('web3');
const config = require('../../client/src/config.json');
const chainId = '97';
const servers = {
  '97': process.env.NODE_URL
}

const web3 = new Web3(servers[chainId]);

const getAddress = (contract) => {
  return config[chainId][contract].address;
};

const getCurrentBlock = () => {
  const now = (new Date().getTime()) / 1000;
  const block = 3;
  return 17787521 + Math.floor((now - 1647965702) / block);
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
  getContract,
  getCurrentBlock
}