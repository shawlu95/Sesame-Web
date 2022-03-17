const blockchain = require('../utils/blockchain');

const getAll = (req, res) => {
  const product = require('../../client/src/config.json');
  res.status(200).json(product);
};

const getAddress = (req, res) => {
  const { product } = req.params;
  const address = blockchain.getAddress(product);
  console.log(address)
  if (address != undefined) {
    return res.status(200).json({ address });
  }
  return res.status(404).send();
};

const getRound = async (req, res) => {
  const { product } = req.params;
  const contract = blockchain.getContract(product);
  const round = await contract.methods.round().call();
  return res.status(200).json({ round });
};

const getCurrentRoundTicket = async (req, res) => {
  const { product } = req.params;
  const contract = blockchain.getContract(product);
  const count = await contract.methods.getTicketCount().call();
  return res.status(200).json({ count });
};

const getTicketForRound = async (req, res) => {
  const { product, round, player } = req.params;
  const contract = blockchain.getContract(product);
  const count = await contract.methods.getUserTicketCount(round, player).call();
  return res.status(200).json({ count });
};

const getRecentWinner = async (req, res) => {
  const { product } = req.params;
  const contract = blockchain.getContract(product);
  const recentWinner = await contract.methods.recentWinner().call();
  return res.status(200).json({ recentWinner });
};

module.exports = {
  getAll, getAddress, getRound, getCurrentRoundTicket, getTicketForRound, getRecentWinner
};