const Room = require('../models/room');

class RoomService {

    /**
     * @description Retrieve a list of all rooms.
     * @param {string} slug - The room title in slug format 
     * @returns {Promise<*>}
     */
    async fetchRoomDetail(slug) {
        try {
            const roomData = await Room.fetchRoomDetail(slug);
            return roomData;

        } catch (err) {
            console.log(err);
        }
    }


    async fetchAllRooms() {
        try {
            const roomData = await Room.fetchAllRooms();
            return roomData;

        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = new RoomService;