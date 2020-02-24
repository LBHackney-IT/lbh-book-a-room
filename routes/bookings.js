const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/booking');

// GET request for new booking form.
router.get('/', bookingController.booking);

module.exports = router;