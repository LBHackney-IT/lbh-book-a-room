
// Show new booking form.
exports.booking = (req, res) => {
    const name = req.params.id;

    res.render('booking.njk', {title: 'Booking Form'});
};