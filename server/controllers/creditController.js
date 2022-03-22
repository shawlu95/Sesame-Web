const Credit = require('../model/credit');
const CreditSchema = require("../schema/credit");
const blockchain = require('../utils/blockchain');
const { StatusCodes } = require('http-status-codes');

const _syncEvents = async () => {
  endBlock = blockchain.getCurrentBlock();

  const interval = 5000;
  const contract = blockchain.getContract('Accountant');
  const address = blockchain.getAddress('Accountant');
  const latest = await CreditSchema.find().sort({ block: -1 }).limit(1);
  const startBlock = latest[0] ? latest[0].block : 17627472;

  var fromBlock = startBlock;
  var eventCount = 0;
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
      eventCount += events.length;
    }
    fromBlock += interval;
  }
  return { startBlock, endBlock, eventCount };
};

const syncEvents = async (req, res) => {
  const { startBlock, endBlock, eventCount } = await _syncEvents();
  res.status(StatusCodes.OK).json({ startBlock, endBlock, eventCount });
}

const calcReward = async (req, res) => {
  await _syncEvents();

};

module.exports = { syncEvents, calcReward };