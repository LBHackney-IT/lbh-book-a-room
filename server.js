// server.js - this file is used to launch the
// Express server and sets up the listener on
// http://localhost:5000 for development

const app = require('./app')

// configure the app to listen for incoming
// traffic on HOST and PORT
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 5000


//-------------------------
// set up server listening
//-------------------------
app.listen( PORT,
            () => console.log(`Listening on http://${HOST}:${PORT}`)
   )
