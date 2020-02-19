const express = require('express');
const router = express.Router();

const booking_controller = require('../controllers/bookingController.js');

// GET request for new booking form.
router.get('/', booking_controller.booking);

module.exports = router;