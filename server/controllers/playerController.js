const { StatusCodes } = require('http-status-codes');

const Credit = require('../model/credit');
const blockchain = require('../utils/blockchain');
const contract = require('./contractController');
const { rankInfo, ticketInfo, playerProductInfo } = require('../db/mock');

const getRanking = async (req, res) => {
  return res.status(200).json(rankInfo)
};

const getTickets = async (req, res) => {
  const { player } = req.params;
  return res.status(StatusCodes.OK).json(ticketInfo);
};

const getPlayerProduct = async (req, res) => {
  const { player, product, limit } = req.params;
  return res.status(StatusCodes.OK).json(playerProductInfo);
};

module.exports = { getRanking, getTickets, getPlayerProduct };