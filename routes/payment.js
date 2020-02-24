const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/payment');

// GET request for the confirmation page.
router.get('/', paymentController.getPaymentResultPage);

module.exports = router;

