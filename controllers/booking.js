const validator = require('express-validator');

const config = require('../config');

exports.booking_get = (req, res) => {
    const oldInput = {
        firstName: '',
        surName: '',
    };

    res.render('booking.njk', { 
        title: 'Booking Form', 
        oldInput: oldInput
    });
};

   // Process and validate the booking page
exports.booking_post = (req, res, next) => {
    const errors = validator.validationResult(req);

    // If errors
    if (!errors.isEmpty()) {
        let errorFields = {};

        const oldInput = {
            firstName: req.body.booking_first_name,
            surname: req.body.booking_surname,
            orgName: req.body.booking_organisation_name,
            contactNumber: req.body.booking_contact_number,
            email: req.body.booking_email,
            eventName: req.body.booking_event_name,
            eventDetails: req.body.booking_event_details,
            attendeeCount: req.body.booking_attendee_count
        };

        errors.array().forEach(function (error, index) {
            switch (error.param) {
                case 'booking_first_name':
                    errorFields.firstName = {
                        msg: config.bookingFormErrors.firstName
                    };
                    break;
                case 'booking_surname':
                    errorFields.surname = {
                        msg: config.bookingFormErrors.surname
                    };
                    break;
                case 'booking_email':
                    errorFields.email = {
                        msg: config.bookingFormErrors.email
                    };
                    break;
                case 'booking_event_name':
                    errorFields.eventName = {
                        msg: config.bookingFormErrors.eventName                    };
                    break;
                case 'booking_event_details':
                    errorFields.eventDetails = {
                        msg: config.bookingFormErrors.eventDetails
                    };
                    break;
                case 'booking_attendee_count':
                    errorFields.attendeeCount = {
                        msg: config.bookingFormErrors.attendeeCount
                    };
                    break;
                case 'booking_agree_tc':
                    errorFields.agreeTC = {
                        msg: config.bookingFormErrors.agreeTC
                    };
                    break;
                default:
                    break;
            }          
        });

        // There are errors. Render the form again with sanitized values/error messages.
        return res.status(422).render('booking.njk', { 
            title: 'Error - Booking Form', 
            oldInput: oldInput, 
            validationErrors: errors.array(),
            errorFields: errorFields
        });

    } else {

        // Form validated, now save booking

        
        // If booking created, display Pay Now page

        // These 4 parameters will come from the actual booking
        // These are DUMMY values for testing
        const bookingRefID = 999;
        const bookingTotal = 20;
        const bookingAccRef = 1938254402;
        const bookingDescription = 'Dalston Education Room';
        
        req.session.booking = {
            callingAppTranReference: bookingRefID,
            paymentAmount: bookingTotal,
            accountReference: bookingAccRef,
            paymentNarrative: bookingDescription
        };

        return res.redirect('pay');
    }
}