const RoomService = require('../services/RoomService');
const { ErrorHandler } = require('../helpers/error');

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
                throw new ErrorHandler(404, `No data found for ${slug}`);
            }

            res.render('room.njk', {title: data.title.rendered, roomData: data});

        } catch (error) {
            next(error);
        }
    }
}