const express = require('express');
const router = express.Router();
const credit = require('../controllers/creditController');

router.route('/sync').get(credit.syncEvents);
router.route('/calc').post(credit.calcReward);
router.route('/tree').post(credit.buildTree);
module.exports = router;