
// Handle payment parameters.
exports.getPaymentResultPage = (req, res, next) => {
    const reasonText = req.query.reason;
    const serviceProcessed = req.query.serviceprocessed && req.query.serviceprocessed === "true" ? true : false;

    res.render('payment.njk', {success: serviceProcessed, reason: reasonText});
};