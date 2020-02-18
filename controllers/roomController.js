exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all rooms.
exports.room_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Room list');
};

// Display detail page for a specific room.
exports.room_detail = function(req, res, next) {
    const name = req.params.id;
    
    res.render('room.html', {roomName: name, title: name});
};