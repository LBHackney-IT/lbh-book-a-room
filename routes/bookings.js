const express = require('express');
const router = express.Router();

const booking_controller = require('../controllers/bookingController.js');

// GET request for new booking form.
router.get('/', booking_controller.booking);

// POST request for new booking form.
router.post('/', booking_controller.booking_create_post);

module.exports = router;