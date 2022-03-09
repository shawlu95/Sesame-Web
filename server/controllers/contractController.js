const blockchain = require('../utils/blockchain');

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
  const round = await contract.methods.round().call();
  var events = await contract.getPastEvents("EnterTicket", {
    fromBlock: 17400756, toBlock: 'latest'
  });
  events = events
    .map(x => x.returnValues)
    .filter(event => event.round == round);
  return res.status(200).json({ count: events.length, events });
};

const getTicketForRound = async (req, res) => {
  const { product, round } = req.params;
  const contract = blockchain.getContract(product);
  var events = await contract.getPastEvents("EnterTicket", {
    fromBlock: 17400756, toBlock: 'latest'
  });
  events = events
    .map(x => x.returnValues)
    .filter(event => event.round == round);
  return res.status(200).json({ count: events.length, events });
};

const getRecentWinner = async (req, res) => {
  const { product } = req.params;
  const contract = blockchain.getContract(product);
  const recentWinner = await contract.methods.recentWinner().call();
  return res.status(200).json({ recentWinner });
};

module.exports = {
  getAddress, getRound, getCurrentRoundTicket, getTicketForRound, getRecentWinner
};