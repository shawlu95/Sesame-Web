const express = require('express');
const router = express.Router();
const contract = require('../controllers/contractController');

router.route('/:product/address').get(contract.getAddress);
router.route('/:product/round').get(contract.getRound);
router.route('/:product/ticket').get(contract.getCurrentRoundTicket);
router.route('/:product/:round/:player/ticket').get(contract.getTicketForRound);
router.route('/:product/recentWinner').get(contract.getRecentWinner);
module.exports = router;