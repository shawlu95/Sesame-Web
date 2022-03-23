const { parseEther } = require('ethers/lib/utils');
const NodeSchema = require('../schema/node');
const blockchain = require('../utils/blockchain');

const accountant = blockchain.getAddress('Accountant');
const contract = blockchain.getContract('PlayerRewardsDistributor');

const getNode = async (req, res) => {
  const { player } = req.params;
  const node = await NodeSchema.findByUser({ accountant, player });
  return res.status(200).json({
    proof: node.proof,
    reward: blockchain.toBigString(node.reward),
    root: node.root
  });
};

const postRoot = async (req, res) => {
  const round = await contract.methods
    .currentRewardRound().call();
  const currentRoot = await contract.methods
    .merkleRootOfRewardRound(round).call();
  const candidateRoot = await NodeSchema.getLatestRoot({ accountant });
  if (currentRoot === candidateRoot) {
    return res.status(400).json({ msg: "Nothing to update" });
  }
  const limit = parseEther('100000000');

  // await contract.methods.updatePlayerRewards(candidateRoot, limit).send
  return res.status(200).json({ round, currentRoot, candidateRoot, limit })
}

module.exports = { getNode, postRoot };