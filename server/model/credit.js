const Credit = require("../schema/credit");

async function patch(data) {
  const query = {
    player: data.player,
    accountant: data.accountant,
    product: data.product,
    round: data.round,
    ticket: data.ticket,
    point: data.point,
    block: data.block
  };
  const options = { upsert: true };
  await Credit.findOneAndUpdate(query, query, options);
};

async function getByUser(player) {
  return await Credit.find({ player });
};

async function getByUserProduct(player, product) {
  return await Credit.find({ player, product });
};

module.exports = { patch, getByUser, getByUserProduct };
