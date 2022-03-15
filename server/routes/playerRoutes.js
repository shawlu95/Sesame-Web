const express = require('express');
const router = express.Router();
const player = require('../controllers/playerController');

router.route('/:player/:product/ticket').get(player.getTicketsForProduct);
router.route('/:player/ticket').get(player.getTickets);

module.exports = router;