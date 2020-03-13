const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/booking');

// GET request for new booking page.
router.get('/', bookingController.booking_get);

// POST request for new booking page.
router.post('/', bookingController.bookingProcess_post);

module.exports = router;