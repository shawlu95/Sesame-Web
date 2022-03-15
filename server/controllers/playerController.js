const Credit = require('../model/credit');
const blockchain = require('../utils/blockchain');
const contract = require('./contractController');

const getTicketsForProduct = async (req, res) => {
  const { product, player } = req.params;
  const address = blockchain.getAddress(product);
  const credits = await Credit.getByUserProduct(player, address);
  return res.status(200).json(credits)
};

const getTickets = async (req, res) => {
  const { player } = req.params;
  const credits = await Credit.getByUser(player);
  return res.status(200).json(credits)
};

module.exports = { getTicketsForProduct, getTickets };