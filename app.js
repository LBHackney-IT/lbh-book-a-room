// Express server configuration

const createError = require('http-errors')
const express       = require('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const morgan        = require('morgan')

const indexRouter = require('./routes/index');
const roomsRouter = require('./routes/rooms');
const bookingsRouter = require('./routes/bookings');


// const authRoutes     = require('./routes/api/auth')
// const onschedRoutes  = require('./routes/api/onsched')

const cookieSession = require('cookie-session')
const rateLimit     = require('express-rate-limit')
const slowDown      = require('express-slow-down')

const keys           = require('./config/keys')

const nunjucks  = require('nunjucks');

//----------------------
// Configuration
//----------------------

const app = express();

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

const _templates = [
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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/public', express.static('public'));
app.use('/assets', express.static('node_modules/lbh-frontend/lbh/assets'));
app.use('/assets', express.static('node_modules/govuk-frontend/govuk/assets'));



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



//-------------------------
// Route Handlers
//-------------------------

app.use('/', indexRouter);
app.use('/rooms', roomsRouter);
app.use('/booking', bookingsRouter);

/* === OnSched API === */
// add rate/speed limiting to the API endpoints

// app.use( '/api', speedLimiter )
// app.use( '/api', rateLimiter )
// app.use( '/api/auth',    authRoutes )
// app.use( '/api/onsched', onschedRoutes )


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



//-------------------------
// Error Handlers
//-------------------------

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// export the app
module.exports = app
