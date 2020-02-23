
module.exports = class Room {
    contructor(name, capacity, prices) {
        this.name = name;
        this.capacity = capacity;
        this.prices = prices;
    }


    static fetchAllRooms() {
        return new Promise((resolve, reject) => {
            console.log('fetchAllRooms......');

            const WPAPI = require( 'wpapi' );
            const namespace = 'wp/v2'; // use the WP API namespace
            const route = '/room/';

            const wp = new WPAPI({ endpoint: process.env.DB_URL }); 
            wp.rooms = wp.registerRoute(namespace, route);

            wp.rooms()
                .then(function( data ) {
                    resolve (data);
                })
                .catch(function( err ) {
                    reject (err);
                });

        })
    }

    static fetchRoomDetail(roomSlug) {

        return new Promise((resolve, reject) => {
            const WPAPI = require( 'wpapi' );
            const namespace = 'wp/v2'; // use the WP API namespace
            const route = '/room/';

            const wp = new WPAPI({ endpoint: process.env.DB_URL }); 
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