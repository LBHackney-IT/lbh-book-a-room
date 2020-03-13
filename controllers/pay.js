const config = require('../config');
const { generatePaymentURL } = require('../utils');

module.exports = {

    /**
     * @description Render the pay now page
     * @param req {object} Express req object 
     * @param res {object} Express res object
     * @param next {object} Express next object
     * @returns {Promise<*>}
     */
    pay_get: async (req, res, next) => {
        try {

            const paymentURLBase = config.payment.URLBase;
            const callingAppTranReference = 999;

            const paymentURLParams = {
                catalogueId: config.payment.catalogueId,
                accountReference: req.session.booking.accountReference,
                paymentAmount: req.session.booking.paymentAmount,
                paymentNarrative: req.session.booking.paymentNarrative,
                returnUrl: `${req.hostname}/confirmation?callingAppTranReference=${callingAppTranReference}`
            }

            const paymentURL = generatePaymentURL(paymentURLBase, paymentURLParams);
            
            res.render('pay.njk', { title: 'Booking Received', url: paymentURL });

        } catch (err) {
            const error = new Error(err);

            return next(error);
        }

    }
        
};