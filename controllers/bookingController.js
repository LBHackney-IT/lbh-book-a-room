

// Show new booking form.
exports.booking = function(req, res) {
    const name = req.params.id;

    res.render('booking.html');
};

// Validate and create this booking
exports.booking_create_post = function(req, res) {
    const name = req.params.id;

    res.render('confirmation.html');
};