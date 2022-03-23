

const express = require('express');
const router = express.Router();
const node = require('../controllers/nodeController');

router.route('/claim/:player').get(node.getNode);
router.route('/root').post(node.postRoot);

module.exports = router;