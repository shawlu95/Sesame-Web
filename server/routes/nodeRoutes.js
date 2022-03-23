

const express = require('express');
const router = express.Router();
const node = require('../controllers/nodeController');
router.route('/claim/:player').get(node.getNode);
module.exports = router;