const Room = require('../models/room');


module.exports = {
    // Display list of all rooms.
    room_list_get: (req, res) => {
        res.send('NOT IMPLEMENTED: Room list');
    },

    // Display list of all rooms.
    room_detail_get: (req, res, next) => {
        const slug = req.params.id;
        
        const newPromise = Room.fetchRoomDetail(slug);
    
        newPromise
            .then(data => {
                // handle data
                if (!data) {
                    res.status(404);
                    return res.redirect('/404');
                }
                   
                res.render('room.njk', {title: data.title.rendered, roomData: data});
            })
            .catch( err => {
                const error = new Error(err);
    
                return next(error);
            });
    }
}