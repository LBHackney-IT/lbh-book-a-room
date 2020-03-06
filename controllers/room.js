const RoomService = require('../services/RoomService');

module.exports = {

    /**
     * @description Display list of all rooms.
     * @param req {object} Express req object 
     * @param res {object} Express res object
     * @param next {object} Express next object
     * @returns {Promise<*>}
     */
    room_detail_get: async (req, res, next) => {
        const slug = req.params.id;
        
        try {
            const data = await RoomService.fetchRoomDetail(slug);

            if (!data) {
                res.status(404);
                return res.redirect('/404');
            }

            res.render('room.njk', {title: data.title.rendered, roomData: data});

        } catch (err) {
            const error = new Error(err);

            return next(error);
        }
    }
}