
// Show confirmation page.
module.exports = {
    
    confirmation: (req, res) => {
        const reasonText = req.query.reason ? req.query.reason : '';
        const serviceProcessed = req.query.serviceprocessed && req.query.serviceprocessed === "true" ? true : false;
        const paymentCancelled = req.query.reason === "cancelled" || req.query.reason === "payment cancelled" ? true : false;
        const paymentFailed = req.query.reason === "payment failed" ? true : false;
        const verificationFailed = req.query.reason === "verification failed" ? true : false;

        res.render('confirmation.njk', 
            {
                title: 'Confirmation result', 
                isPaymentSuccess: serviceProcessed,
                isPaymentCancelled: paymentCancelled,
                isPaymentFailed: paymentFailed,
                isVerificationFailed: verificationFailed,
                reason: reasonText
            }
        );
    }
};