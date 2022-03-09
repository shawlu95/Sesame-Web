require('dotenv').config();
const Web3 = require('web3');

// https://data-seed-prebsc-1-s1.binance.org:8545
const chainId = 4;

const {
  Contract,
  Wallet
} = require('ethers');

const web3 = new Web3(process.env.NODE_URL);

const getWeb3 = () => {
  return new Web3(process.env.NODE_URL);
};

const getAddress = (product) => {
  return {
    'SesameBnb': '0xbE9CaD789c5db4aA43374A11709D0786aC31580F'
  }[product];
};

const getArtifact = (product) => {
  return require(`../../client/src/artifacts/contracts/${product}.sol/${product}.json`);
};

const getContract = (product) => {
  const JisellArtifact = getArtifact(product);
  const address = getAddress(product);
  return new web3.eth.Contract(JisellArtifact.abi, address);
};

module.exports = {
  getAddress,
  getContract
}