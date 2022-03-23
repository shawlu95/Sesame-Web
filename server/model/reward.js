const Reward = require("../schema/reward");

async function patch(data) {
  const query = data;
  const options = { upsert: true };
  await Reward.findOneAndUpdate(query, query, options);
};

module.exports = { patch };