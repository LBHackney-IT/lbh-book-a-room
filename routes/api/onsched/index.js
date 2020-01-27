const express    = require('express')
const bodyParser = require('body-parser')

const { performGetRequest,
        performPostRequest,
        performPutRequest,
        performDeleteRequest } = require('../../../utils/requestMethods')
const errorResponses           = require('../../../middlewares/onschedErrorResponses')
const logErrors                = require('../../../middlewares/logErrors')


// initialize the router
const router = express.Router()


//-----------------------------
// route specific middleware
//-----------------------------
router.use( bodyParser.json() )


//----------------------
// route handlers
//----------------------

// Generic route handler for /api/onsched/... routes
// this route handler handles GET, POST, PUT, PATCH, DELETE
// router.use( '/:api',
router.use( '/',
  (request, response, next) => {
    // const { api } = request.params
    const api = 'consumer'

    switch ( request.method ) {
      // handle GET requests
      case 'GET':
        performGetRequest( api, request, response, next )
        break

      // handle POST requests
      case 'POST':
        performPostRequest( api, request, response, next )
        break

      // handle PUT and PATCH requests
      case 'PUT':
      case 'PATCH':
        performPutRequest( api, request, response, next )
        break

      // handle DELETE requests
      case 'DELETE':
        performDeleteRequest( api, request, response, next )
        break

    }

})  // end - /api/onsched/...


//-------------------------------------------
// route specific error handling middleware
// error middleware must come after routes
// and all other middleware
//-------------------------------------------
router.use( logErrors )
router.use( errorResponses )


// export the router
module.exports = router
