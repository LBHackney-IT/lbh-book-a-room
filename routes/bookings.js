const express = require('express');
const router = express.Router();

const { bookingValidateFields }= require('../middleware/validation');
const bookingController = require('../controllers/booking');


// GET request for new booking page.
router.get('/', bookingController.booking_get);


// POST request for new booking page.
router.post('/', bookingValidateFields, (req, res, next) => {
    bookingController.booking_post(req, res, next)
});

module.exports = router;