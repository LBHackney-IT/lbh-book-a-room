const express = require('express');
const session = require('express-session');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const nunjucks  = require('nunjucks');
const morgan = require('morgan');

const config = require('../config');
const indexRouter = require('../routes/index');
const roomsRouter = require('../routes/rooms');
const bookingsRouter = require('../routes/bookings');
const payRouter = require('../routes/pay');
const confirmationRouter = require('../routes/confirmation');

const logger = require('../middleware/logger');
const { handleError } = require('../helpers/error');

module.exports = {
    init: async ( app ) => {
        //----------------------
        // Configuration
        //----------------------

        app.use(session({ 
            secret: config.sessionSecret, 
            resave: false, 
            saveUninitialized: false 
        }));
        
        app.use(express.urlencoded());
        app.use(helmet());
        app.use(compression());

        app.use(morgan(
            ':method :url :status :response-time ms', 
            { stream: logger.stream }
        ));

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

        app.use(express.static(path.join(__dirname, '../public')));
        app.use('/assets', express.static('node_modules/lbh-frontend/lbh/assets'));
        app.use('/assets', express.static('node_modules/govuk-frontend/govuk/assets'));


        //-------------------------
        // Route Handlers
        //-------------------------

        app.use('/room', roomsRouter);
        app.use('/booking', bookingsRouter);
        app.use('/pay', payRouter);
        app.use('/confirmation', confirmationRouter);
        app.use('/', indexRouter);


        //-------------------------
        // Error Handlers
        //-------------------------

        app.use((req, res, next) => {
            const error = new Error();

            error.message = "Page not found";
            error.statusCode = 404;
            error.is404 = true;

            next(error);
        });

        app.use((err, req, res, next) => {
            handleError(err, req, res);
          });
    }
}