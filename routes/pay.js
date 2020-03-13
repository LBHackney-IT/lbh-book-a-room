const express = require('express');
const router = express.Router();

const payController = require('../controllers/pay');

// GET request to display the pay now page.
router.get('/', payController.pay_get);

module.exports = router;