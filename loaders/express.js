const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const nunjucks  = require('nunjucks');

const indexRouter = require('../routes/index');
const roomsRouter = require('../routes/rooms');
const bookingsRouter = require('../routes/bookings');
const confirmationRouter = require('../routes/confirmation');

const errorController = require('../controllers/error');

module.exports = {
    init: async ( app ) => {
        //----------------------
        // Configuration
        //----------------------


        app.use(helmet());
        app.use(compression())

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
        app.use('/confirmation', confirmationRouter);
        app.use('/', indexRouter);

        app.use('/500', errorController.get500);

        app.use(errorController.get404);

        app.use((error, req, res, next) => {
            console.log(error);
            res.redirect('/500');
        })
    }
}