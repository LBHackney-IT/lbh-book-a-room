const { check } = require('express-validator');

const config = require('../config');

const bookingValidateFields = [
  check('booking_first_name', config.bookingFormErrors.firstName).trim().isLength({ min: 1 }).trim().escape(),
  check('booking_surname', config.bookingFormErrors.surname).trim().isLength({ min: 1 }).trim().escape(),
  check('booking_email', config.bookingFormErrors.email).isEmail().normalizeEmail(),
  check('booking_event_name', config.bookingFormErrors.eventName).trim().isLength({ min: 1 }).trim().escape(),
  check('booking_event_details', config.bookingFormErrors.eventDetails).trim().isLength({ min: 1, max: 200 }).escape(),
  check('booking_attendee_count', config.bookingFormErrors.attendeeCount).trim().isLength({ min: 1 }).escape(),
  check('booking_agree_tc', config.bookingFormErrors.agreeTC).trim().isLength({ min: 1 }),
];

module.exports = {
  bookingValidateFields
}