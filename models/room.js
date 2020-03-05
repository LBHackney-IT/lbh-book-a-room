const config = require('../config');

module.exports = {
   
    /**
     * Fetch all Rooms data fom the CMS.
     */
    fetchAllRooms: function() {
        return new Promise((resolve, reject) => {
            
            const WPAPI = require( 'wpapi' );
            const namespace = config.db.db_namespace; // use the WP API namespace
            const route = config.db.db_room_route;

            const wp = new WPAPI({ endpoint: config.db.db_url }); 
            wp.rooms = wp.registerRoute(namespace, route);

            wp.rooms()
                .then(function( data ) {
                    resolve (data);
                })
                .catch(function( err ) {
                    reject (err);
                });
        })
    },


    /**
     * Fetch data for a specific Room from the CMS using the slug for lookup
     * @param {string} roomSlug - The room title in slug format
     */
    fetchRoomDetail: function(roomSlug) {

        return new Promise((resolve, reject) => {
            const WPAPI = require( 'wpapi' );
            const namespace = config.db.db_namespace; // use the WP API namespace
            const route = config.db.db_room_route;

            const wp = new WPAPI({ endpoint: config.db.db_url }); 
            wp.rooms = wp.registerRoute(namespace, route);

            wp.rooms().slug(roomSlug)
                .then(function( data ) {
                    resolve (data[0]);
                })
                .catch(function( err ) {
                    reject (err);
                });
        })
    }
}