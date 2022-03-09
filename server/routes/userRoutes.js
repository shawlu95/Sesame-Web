const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');

router.route('/:user/:product/ticket').get(user.getUserickets);
module.exports = router;