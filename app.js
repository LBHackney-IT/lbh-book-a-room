// Express server configuration

const express = require('express')
const path = require('path');
const nunjucks  = require('nunjucks');

const indexRouter = require('./routes/index');
const roomsRouter = require('./routes/rooms');
const bookingsRouter = require('./routes/bookings');
const confirmationRouter = require('./routes/confirmation');


//----------------------
// Configuration
//----------------------

const app = express();

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
app.engine( 'njk', nunjucks.render ) ;
app.set( 'view engine', 'html' ) ;

app.use('/public', express.static('public'));
app.use('/assets', express.static('node_modules/lbh-frontend/lbh/assets'));
app.use('/assets', express.static('node_modules/govuk-frontend/govuk/assets'));


//-------------------------
// Route Handlers
//-------------------------

app.use('/', indexRouter);
app.use('/rooms', roomsRouter);
app.use('/booking', bookingsRouter);
app.use('/confirmation', confirmationRouter);

// export the app
module.exports = app
