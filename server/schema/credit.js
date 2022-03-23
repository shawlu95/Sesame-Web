var mongoose = require('mongoose');

const CreditSchema = new mongoose.Schema({
  player: String,
  accountant: String,
  product: String,
  round: Number,
  ticket: Number,
  point: Number,
  block: Number
});

CreditSchema.statics.firstEvent = async function (accountant) {
  const result = await this.find({ accountant })
    .sort({ block: 1 })
    .limit(1);
  return result ? result[0] : undefined;
};

CreditSchema.statics.latestEvent = async function (accountant) {
  const result = await this.find({ accountant })
    .sort({ block: -1 })
    .limit(1);
  return result ? result[0] : undefined;
};

CreditSchema.statics.calculateTotalCredit = async function ({ accountant, fromBlock, toBlock }) {
  const result = await this.aggregate([
    { $match: { accountant: accountant } },
    { $match: { point: { $lt: 1e23 } } },
    { $match: { block: { $gte: fromBlock, $lt: toBlock } } },
    {
      $group: {
        _id: undefined,
        credit: { $sum: '$point' }
      }
    }
  ]);
  return result.length > 0 ? result[0].credit : 0;
};

CreditSchema.statics.calculateCredit = async function ({ accountant, fromBlock, toBlock }) {
  return await this.aggregate([
    { $match: { accountant: accountant } },
    { $match: { point: { $lt: 1e23 } } },
    { $match: { block: { $gte: fromBlock, $lt: toBlock } } },
    {
      $group: {
        _id: '$player',
        credit: { $sum: '$point' }
      }
    },
    { $sort: { credit: -1 } }
  ]);
};

var Credit = mongoose.model('Credit', CreditSchema);
module.exports = Credit;