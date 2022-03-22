const express = require('express');
const router = express.Router();
const credit = require('../controllers/creditController');

router.route('/sync').get(credit.syncEvents);
router.route('/tree').post(credit.calcReward);

module.exports = router;