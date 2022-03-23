var mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema({
  player: String,
  accountant: String,
  period: Number,
  fromBlock: Number,
  toBlock: Number,
  userCredit: Number,
  periodCredit: Number,
  userReward: Number,
  periodReward: Number
});

RewardSchema.statics.sumReward = async function ({ accountant }) {
  return await this.aggregate([
    { $match: { accountant: accountant } },
    {
      $group: {
        _id: '$player',
        reward: { $sum: '$userReward' },
        block: { $max: '$toBlock' }
      }
    },
    { $sort: { reward: -1 } }
  ]);
};

var Reward = mongoose.model('Reward', RewardSchema);
module.exports = Reward;