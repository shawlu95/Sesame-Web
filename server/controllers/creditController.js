const Credit = require('../model/credit');
const Reward = require('../model/reward');
const Node = require('../model/node');
const CreditSchema = require("../schema/credit");
const RewardSchema = require("../schema/reward");
const blockchain = require('../utils/blockchain');
const { StatusCodes } = require('http-status-codes');
const { parseEther } = require("ethers/lib/utils");
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const refBlock = 17627472;
const contract = blockchain.getContract('Accountant');
const accountant = blockchain.getAddress('Accountant');
const rewardDistributor = blockchain.getContract('PlayerRewardsDistributor');
const eventPageSize = 5000;
const rewardPeriodLength = 28800;
const currentBlock = blockchain.getCurrentBlock();

const _syncEvents = async () => {
  const latest = await CreditSchema.latestEvent(accountant);
  const startBlock = latest ? latest.block : refBlock;

  var fromBlock = startBlock;
  var eventCount = 0;
  while (fromBlock < currentBlock) {
    var toBlock = Math.min(fromBlock + eventPageSize, currentBlock);
    var events = await contract.getPastEvents("Credit", { fromBlock, toBlock });
    for (let i = 0; i < events.length; i++) {
      let event = events[i];
      let data = event.returnValues;
      await Credit.patch({
        block: event.blockNumber,
        player: data.player,
        accountant: accountant,
        product: data.product,
        round: parseInt(data.round),
        ticket: parseInt(data.ticket),
        point: data.point
      });
    }
    eventCount += events.length;
    fromBlock += eventPageSize;
  }
  return { startBlock, currentBlock, eventCount };
};

const _calcReward = async () => {
  const firstEvent = await CreditSchema.firstEvent(accountant);
  const startBlock = firstEvent ? firstEvent.block : refBlock;

  var fromBlock = startBlock;
  var toBlock = fromBlock + rewardPeriodLength;
  var period = 0;
  while (toBlock < currentBlock) {
    const credits = await CreditSchema.calculateCredit({
      accountant, fromBlock, toBlock
    });

    var totalCredit = await CreditSchema.calculateTotalCredit({
      accountant, fromBlock, toBlock
    });
    totalCredit = blockchain.toBigNumber(totalCredit);

    // TODO: adjust for period change
    var periodReward = parseEther('2.8').mul(rewardPeriodLength);
    for (var i = 0; i < credits.length; i++) {
      var { _id: address, credit } = credits[i];
      credit = blockchain.toBigNumber(credit);

      var reward = periodReward.mul(credit).div(totalCredit);
      await Reward.patch({
        player: address,
        accountant,
        period,
        fromBlock,
        toBlock,
        userCredit: credit,
        periodCredit: totalCredit,
        userReward: reward,
        periodReward
      });
    }

    period += 1;
    fromBlock += rewardPeriodLength;
    toBlock += rewardPeriodLength;
  }
  return { period };
};

const _buildTree = async () => {
  await _calcReward();
  const leavesEncoded = [];
  const leavesMap = {}
  const rewards = await RewardSchema.sumReward({ accountant });
  for (var i = 0; i < rewards.length; i++) {
    let { _id: address, reward, block } = rewards[i];
    reward = blockchain.toBigNumber(reward);
    let leaf = blockchain.toMerkleLeaf(address, reward);
    leavesEncoded.push(leaf);
    leavesMap[address] = { reward, leaf, block };
  }

  const round = await rewardDistributor.methods
    .currentRewardRound().call();

  const tree = new MerkleTree(leavesEncoded, keccak256, { sortPairs: true });
  const root = tree.getHexRoot();
  for (const [address, data] of Object.entries(leavesMap)) {
    await Node.patch({
      player: address,
      accountant,
      reward: data.reward,
      leaf: data.leaf,
      proof: tree.getHexProof(data.leaf),
      root,
      block: data.block,
      round: parseInt(round)
    });
  }

  return { root };
};

const syncEvents = async (req, res) => {
  const { startBlock, currentBlock, eventCount } = await _syncEvents();
  res.status(StatusCodes.OK).json({ startBlock, currentBlock, eventCount });
};

const calcReward = async (req, res) => {
  await _syncEvents();
  const { period } = await _calcReward();
  return res.status(200).json({ period });
};

const buildTree = async (req, res) => {
  const { root } = await _buildTree();
  res.status(200).json({ root });
};

module.exports = { syncEvents, calcReward, buildTree };