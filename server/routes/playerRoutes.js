const express = require('express');
const router = express.Router();
const player = require('../controllers/playerController');

router.route('/:player/:product/:limit').get(player.getPlayerProduct);
router.route('/:player/ticket').get(player.getTickets);
router.route('/rank').get(player.getRanking);

module.exports = router;