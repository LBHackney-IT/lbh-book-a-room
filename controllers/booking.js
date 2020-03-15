
module.exports = {
    // Show the Booking page
    booking_get: (req, res) => {
        res.render('booking.njk', {title: 'Booking Form'});
    },

    // Process and validate the booking page
    bookingProcess_post: async (req, res) => {

        try {
            // Validate Form


            // If valid, create booking


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

            res.redirect('pay');

        } catch (err) {
            next(error);
        };       
    }
}