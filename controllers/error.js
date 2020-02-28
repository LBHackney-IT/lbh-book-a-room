
// Error Controller
exports.get404 = (req, res) => {
    res.status(404).render('404.njk')
};

exports.get500 = (req, res) => {
    res.status(500).render('500.njk')
};