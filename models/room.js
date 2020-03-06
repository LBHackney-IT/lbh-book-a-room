const config = require('../config');
const WPAPI = require( 'wpapi' );

class RoomModel {

    constructor() {
        this.wp = new WPAPI({ endpoint: config.db.db_url }); 
        this.wp.rooms = this.wp.registerRoute(config.db.db_namespace, config.db.db_room_route);
    }
    
    /**
     * @description Fetch all rooms data.
     * @returns {Promise<*>}
     */
    async fetchAllRooms() {

        try {
            const data = await this.wp.rooms();
            return data;

        } catch (err) {
            console.log('RoomModel ERR');
            console.log(err)
            return (err)
        }
    }

    /**
     * @description Fetch data for a specific Room from the CMS using the slug for lookup
     * @param {string} roomSlug - The room title in slug format
     * @returns {Promise<*>}
     */
    async fetchRoomDetail(roomSlug) {

        try {
            const data = await this.wp.rooms().slug(roomSlug);
            return data[0];
        } catch (err) {
            console.log('RoomModel ERR');
            console.log(err);
            return (err)
        }
    }

}

module.exports = new RoomModel;