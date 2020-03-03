const Room = require('../models/room');

// Show index page.
module.exports = {

    index: (req, res) => {

        const newPromise = Room.fetchAllRooms();

        newPromise
            .then(function (data) {
                if (!data) {
                    res.status(404);
                    return res.redirect('/404');
                }

                res.render('index.njk', {title: 'Home', roomCards: data});
            })
            .catch(function( err ) {
                const error = new Error(err);

                return next(error);
            });
    }
        
};