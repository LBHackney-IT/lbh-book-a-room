const RoomService = require('../services/RoomService');

// Show index page.
module.exports = {

    /**
     * @description Render the index page with a full list of rooms.
     * @param req {object} Express req object 
     * @param res {object} Express res object
     * @param next {object} Express next object
     * @returns {Promise<*>}
     */
    all_rooms_get: async (req, res, next) => {

        try {
            const data = await RoomService.fetchAllRooms();

            if (!data) {
                res.status(404);
                return res.redirect('/404');
            }

            res.render('index.njk', {title: 'Home', roomCards: data});

        } catch (err) {
            const error = new Error(err);

            return next(error);
        }

    }
        
};