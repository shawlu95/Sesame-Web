const Node = require("../schema/node");

async function patch(data) {
  const query = data;
  const options = { upsert: true };
  await Node.findOneAndUpdate(query, query, options);
};

module.exports = { patch };