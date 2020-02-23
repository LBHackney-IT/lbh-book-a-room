
// Show inde page.
exports.index = function(req, res) {
    const name = req.params.id;

    res.render('index.njk', {title: 'Hackney Book A Room | Home'}); 
};