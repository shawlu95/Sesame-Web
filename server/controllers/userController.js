
const blockchain = require('../utils/blockchain');

const getUserickets = async (req, res) => {
  const { product, user } = req.params;
  const contract = blockchain.getContract(product);
  var events = await contract.getPastEvents("EnterTicket", {
    filter: { by: user },
    fromBlock: 17400756, toBlock: 'latest'
  });
  events = events.map(x => x.returnValues);
  if (events != undefined) {
    return res.status(200).json({
      count: events.length, events
    });
  }
  return res.status(404).send();
};


module.exports = { getUserickets };