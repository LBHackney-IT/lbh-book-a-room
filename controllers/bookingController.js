

// Show new booking form.
exports.booking = function(req, res) {
    const name = req.params.id;

    res.render('booking-form.html', {roomName: name, title: "Booking form"});
};

// Validate and create this booking
exports.booking_create_post = function(req, res) {
    const name = req.params.id;

    res.render('thank-you.html');
};