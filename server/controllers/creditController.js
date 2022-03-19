const Credit = require('../model/credit');
const CreditSchema = require("../schema/credit");
const blockchain = require('../utils/blockchain');
const { StatusCodes } = require('http-status-codes');

const syncEvents = async (req, res) => {
  let { endBlock } = req.params;
  endBlock = parseInt(endBlock);

  const interval = 5000;
  const contract = blockchain.getContract('Accountant');
  const address = blockchain.getAddress('Accountant');
  const latest = await CreditSchema.find().sort({ block: -1 }).limit(1);
  const startBlock = latest[0] ? latest[0].block : 17627472;

  var fromBlock = startBlock;
  while (fromBlock < endBlock) {
    var toBlock = Math.min(fromBlock + interval, endBlock);
    var events =
      await contract.getPastEvents("Credit", { fromBlock, toBlock });
    for (let i = 0; i < events.length; i++) {
      let event = events[i];
      let data = event.returnValues;
      await Credit.patch({
        block: event.blockNumber,
        player: data.player,
        accountant: address,
        product: data.product,
        round: parseInt(data.round),
        ticket: parseInt(data.ticket),
        point: data.point
      });
    }
    console.log(fromBlock, toBlock, events.length)
    fromBlock += interval;
  }
  res.status(StatusCodes.OK).json({ fromBlock, toBlock });
}

module.exports = { syncEvents };