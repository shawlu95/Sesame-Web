const Credit = require('../model/credit');
const CreditSchema = require("../schema/credit");
const blockchain = require('../utils/blockchain');
const { StatusCodes } = require('http-status-codes');
const { parseEther } = require("ethers/lib/utils");
const { BigNumber } = require('ethers');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

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

  const sum = {
    '0x4Cd5675c4f70513e361AA77B70e8089FB5429A0e': new BigNumber.from('5250000000000000000'),
    '0xbEF5C732b77A78F8C752704FC598cF68b34A0E5d': new BigNumber.from('5250000000000000000')
  }
  const totalCredit = new BigNumber.from('5250000000000000000');
  const amount = new BigNumber.from('5250000000000000000');
  const leavesEncoded = [];
  const leavesMap = {}
  for (const [address, credit] of Object.entries(sum)) {
    let reward = amount.mul(credit).div(totalCredit);
    let leaf = blockchain.toMerkleLeaf(address, reward);
    leavesEncoded.push(leaf);
    leavesMap[address] = { reward, leaf };
  }

  console.log(leavesEncoded)

  const tree = new MerkleTree(leavesEncoded, keccak256, { sortPairs: true });
  const root = tree.getHexRoot(); // set this as root node in contract
  console.log('root', root);

  for (const [address, data] of Object.entries(leavesMap)) {
    leavesMap[address].proof = tree.getHexProof(data.leaf)
  }
  console.log(leavesMap);
  res.status(200).json({ root });
};

module.exports = { syncEvents, calcReward };