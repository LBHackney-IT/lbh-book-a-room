module.exports = {
    generatePaymentURL: (baseURL, params) => {
        const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

        return baseURL + queryString;
    } 

}