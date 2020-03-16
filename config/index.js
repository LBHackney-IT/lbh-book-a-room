require('dotenv').config(); // this loads the defined variables from .env

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


module.exports = {
    host: process.env.HOST || "localhost",
    port: parseInt(process.env.PORT, 10) || 5000,
    protocol: process.env.PROTOCOL,
    sessionSecret: process.env.SESSION_SECRET,

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
    },

    winston: {
        file: {
            file_level: process.env.WINSTON_FILE_LEVEL,
            filename: process.env.WINSTON_FILE_FILENAME,
            dirname: process.env.WINSTON_FILE_DIRNAME,
            datepattern: process.env.WINSTON_FILE_DATEPATTERN,
            handleExceptions: process.env.WINSTON_FILE_HANDLE_EXCEPTIONS,
            json: process.env.WINSTON_FILE_JSON,
            maxsize: process.env.WINSTON_FILE_MAX_SIZE,
            maxFiles: process.env.WINSTON_FILE_MAX_FILES,
            colorize: process.env.WINSTON_FILE_COLORIZE
        },
        console: {
            file_level: process.env.WINSTON_CONSOLE_LEVEL,
            handleExceptions: process.env.WINSTON_CONSOLE_HANDLE_EXCEPTIONS,
            json: process.env.WINSTON_CONSOLE_JSON,
            colorize: process.env.WINSTON_CONSOLE_COLORIZE
        }
    },

    payment: {
        URLBase: process.env.PAYMENT_URL_BASE,
        catalogueId: process.env.PAYMENT_CATALOGUE_CODE
    }
}