var mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
    player: String,
    accountant: String,
    reward: Number,
    leaf: Buffer,
    proof: [String],
    root: String,
    block: Number,
    round: Number
});

NodeSchema.statics.getLatestRoot = async function ({ accountant }) {
    const result = await this.find({ accountant })
        .sort({ block: -1 })
        .limit(1);
    if (result.length == 0)
        return undefined
    return result[0].root;
};

NodeSchema.statics.findByUser = async function ({ accountant, player }) {
    const result = await this.find({ accountant, player })
        .sort({ round: -1 })
        .limit(1);
    if (result.length == 0)
        return undefined
    const node = result[0];
    node._id = undefined;
    node.accountant = undefined;
    node.player = undefined;
    node.block = undefined;
    return node;
};

var Node = mongoose.model('Node', NodeSchema);
module.exports = Node;