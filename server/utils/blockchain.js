require('dotenv').config();
const Web3 = require('web3');

// https://data-seed-prebsc-1-s1.binance.org:8545
const web3 = new Web3(process.env.NODE_URL);

const getAddress = (contract) => {
  return {
    'Accountant': '0x37A2BFC6f7d01108a8CF2D3E4f8de4C4B79434FF',
    'SesameNative': '0x9aec5565a530977dae6De3d6C9C2b30d057D749D'
  }[contract];
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