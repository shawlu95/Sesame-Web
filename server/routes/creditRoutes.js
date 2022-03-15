const express = require('express');
const router = express.Router();
const credit = require('../controllers/creditController');

router.route('/sync/:endBlock').get(credit.syncEvents);

module.exports = router;