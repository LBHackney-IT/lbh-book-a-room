// Express server configuration
// configuration of the app has been separated
// from the actual server initialization
// (server.js) to support testing

const express       = require('express')
// const morgan        = require('morgan')
// const cookieSession = require('cookie-session')
// const rateLimit     = require('express-rate-limit')
// const slowDown      = require('express-slow-down')

// const keys           = require('./config/keys')
// const authRoutes     = require('./routes/api/auth')
// const onschedRoutes  = require('./routes/api/onsched')

const nunjucks  = require('nunjucks');

//----------------------
// Configuration
//----------------------
// instantiate the express application
// the app object is used to configure the
// server, listen to incoming request, and
// route them to the appropriate route handlers
const app = express();
const path = require('path');

var _templates = [
  'views/',
  'node_modules/lbh-frontend/lbh/',
  'node_modules/lbh-frontend/lbh/components/',
  'node_modules/govuk-frontend/govuk/',
  'node_modules/govuk-frontend/govuk/components/'
];

nunjucks.configure( _templates, {
    autoescape: true,
    cache: false,
    express: app
} ) ;

app.set('views', path.join(__dirname, 'views'));

// Set Nunjucks as rendering engine for pages with .html suffix
app.engine( 'html', nunjucks.render ) ;
app.set( 'view engine', 'html' ) ;
app.use('/public', express.static('public'));
app.use('/assets', express.static('node_modules/lbh-frontend/lbh/assets'));
app.use('/assets', express.static('node_modules/govuk-frontend/govuk/assets'));



//-----------------------
// Server Middleware
//-----------------------
// each call to app.use wires up a piece of middleware
// inside the application.  these middleware modify
// incoming requests to the app BEFORE they are sent to
// the route handlers

/*
// if keys.isDevelopment is set, add console output
if ( keys.isDevelopment ) {
  app.use( morgan('dev') )
}

// tell express to use cookie-session
// and configure options
app.use(
  cookieSession(
    { 
      maxAge: 60 * 60 * 1000,
      keys:   [ keys.cookieKey ]
    }
  )
)

// speed limiter configuration
const speedLimiter = slowDown(
  {
    windowMs:   30 * 60 * 1000, // 30 minutes
    delayAfter: 50,             // allow 50 requests to go at full-speed, then...
    delayMs:    500             // 6th request has a 500ms delay,
                                // 7th has a 1000ms delay, 8th gets 1500ms, etc.
  }
)

// rate limiting configuration
const rateLimiter = rateLimit(
  {
    windowMs: 60 * 1000, // 1 minute
    max:      30,        // max requests during the time period
    message:  'Too many requests from this IP.  Try again later!'
  }
)

// add rate/speed limiting to the API endpoints
app.use( '/api', speedLimiter )
app.use( '/api', rateLimiter )



//-------------------------
// Route Handlers
//-------------------------
// app.use( '/api/auth',    authRoutes )
// app.use( '/api/onsched', onschedRoutes )

*/
// configure static asset routes for the clients apps
// only if NODE_ENV is 'production' or 'sandbox'
// these are only routes used for the deployed app

//console.log(process.env.NODE_ENV);

if ( process.env.NODE_ENV === 'production' ||
     process.env.NODE_ENV === 'sandbox' ) {

  // Tell Express to serve up production assets
  // like our main.js file or main.css file
  //app.use( express.static('public') )
  // if we don't know the file that is being requested,
  // look inside public to see if there
  // is a match.  the path is relative to the app root

  // for all other/unknown routes,
  // Express will serve up the index.html file
  // if it doesn't recognize the route
  // Essentially hand it over to the client app

};
  

app.use( express.static('/public') );

app.get('/', function(req, res){
  res.render('index.html', {title: 'Main page'});    
});

app.get('/libraries/:id', function(req, res){
  const name = req.params.id;
  const type = "libraries";

  res.render('room-list.html', {venueName: name, venueType: type});
});

app.get('/room/:id', function(req, res){
  const name = req.params.id;

  res.render('room.html', {roomName: name});
});

app.get('/booking', function(req, res){
  const name = req.params.id;

  res.render('booking-form.html', {roomName: name});
});

app.get('/thank-you', function(req, res){
  const name = req.params.id;

  res.render('thank-you.html', {roomName: name});
});


// export the app for testing and
// use in server.js
module.exports = app
