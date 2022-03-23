const NodeSchema = require('../schema/node');
const blockchain = require('../utils/blockchain');

const accountant = blockchain.getAddress('Accountant');

const getNode = async (req, res) => {
  const { player } = req.params;
  const node = await NodeSchema.findByUser({ accountant, player });
  return res.status(200).json({
    proof: node.proof,
    reward: blockchain.toBigString(node.reward),
    root: node.root
  });
};

module.exports = { getNode };