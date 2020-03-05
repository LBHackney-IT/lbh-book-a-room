require('dotenv').config(); // this loads the defined variables from .env

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


module.exports = {
    host: process.env.HOST || "localhost",
    port: parseInt(process.env.PORT, 10) || 5000,

    onsched: {
        onsched_client_id:  process.env.ONSCHED_CLIENT_ID,
        onsched_client_secret: process.env.ONSCHED_CLIENT_SECRET,
        onsched_scope: process.env.ONSCHED_CLIENT_SECRET,
        onsched_identity_url: process.env.ONSCHED_IDENTITY_URL,
        onsched_api_url: process.env.ONSCHED_API_URL,
        cookie_key: process.env.COOKIE_KEY
    },

    db: {
        db_url: process.env.DB_URL,
        db_namespace: process.env.DB_NAMESPACE,
        db_room_route: process.env.DB_ROOM_ROUTE
    }
}