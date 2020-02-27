const Room = require('../models/room');

// Show index page.
exports.index = function(req, res) {

    const newPromise = Room.fetchAllRooms();

    newPromise
        .then(function (data) {
            res.render('index.njk', {title: 'Home', roomCards: data});
        })
        .catch(function( err ) {
            res.status(404);
            res.redirect('/404');
        });
        
};