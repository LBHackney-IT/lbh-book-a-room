const Room = require('../models/room');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all rooms.
exports.room_list_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Room list');
};

// Display detail page for a specific room.
exports.room_detail_get = function(req, res, next) {
    const slug = req.params.id;
    
    const newPromise = Room.fetchRoomDetail(slug);

    newPromise
        .then(function (data) {
            // handle data
            res.render('room.njk', {title: data.title.rendered, roomData: data});
        })
        .catch(function( err ) {
            console.log(err)
            res.status(404);
            res.redirect('404.njk');
        });
};