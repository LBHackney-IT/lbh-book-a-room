const express     = require('express')
const axios       = require('axios')
const bodyParser  = require('body-parser')
const querystring = require('querystring')

const keys = require('../../config/keys')


// initialize the router
const router = express.Router()


// -----------------------------
// route specific middleware
// -----------------------------
router.use( bodyParser.json() )


// ------------------
// route handlers
//------------------
// POST /api/auth/initialize
router.post( '/initialize',
  (request, response, next) => {
    const params = {
      client_id:     keys.onschedClientID,
      client_secret: keys.onschedClientSecret,
      scope:         keys.scope,
      grant_type:    'client_credentials',
    }

    const tokenURL = `${keys.onschedIdentityURL}/connect/token`

    // querystring.stringify(params) will encode the param data
    // in application/x-www-form-urlencoded format, which is required
    // by the Identity Server
    axios.post( tokenURL, querystring.stringify(params) )
         .then( resp => {
           // set the access token on the session
           request.session.tokenset = resp.data

           // if preferred to have the access token in the
           // client app, you can send it as a response here
           response.json( { initialized: true } )
         })
         .catch( next )

  }

)//-- end POST /api/auth/initialize


// useful for development
if ( keys.isDevelopment ) {
  // GET /api/auth/access_token
  router.get( '/access_token',
    (request, response) => {
      response.send( request.session.tokenset || {} )
    }
  )

}


// DELETE /logout
// deletes the session information
router.delete( '/logout',
  (request, response) => {
    delete request.session.tokenset
    delete request.session

    response.json( { initialized: false } )
  }
)


// export the router
module.exports = router
