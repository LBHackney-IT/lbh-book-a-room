
// Show new booking form.
exports.booking = function(req, res) {
    const name = req.params.id;

    res.render('booking.njk', {title: 'Booking Form'});
};