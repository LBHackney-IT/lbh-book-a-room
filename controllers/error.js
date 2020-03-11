module.exports ={
    get404Page: (req, res) => {
        res.status(404);
        return res.render('404.njk');
    },

    getErrorPage: (error, req, res, next) => {
        res.status(error.status || 500);
        return res.render('500.njk');
    }
}