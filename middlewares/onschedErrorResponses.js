// custom error handling for OnSched API
const _ = require('lodash')


module.exports = ( error, request, response, next ) => {
  if ( response.headersSent ) {
    return next( error )
  }

  const responseObj   = {}
  const errorResponse = error.response           || {}
  const status        = errorResponse.status     || 500
  const statusText    = errorResponse.statusText || 'Server Error'
  const data          = errorResponse.data       || 'An unknown error has occurred'

  // create a JSON API style response object
  //
  // handle '401: Unauthorized error'
  //        '404: Not Found'
  if ( errorResponse && (status === 401 || status === 404 ) ) {
    responseObj.errors = [
      {
        status: status,
        title:  statusText,
        detail: error.message,
      }
    ]

  }
  // if there is only a single error response on the
  // data.error property
  else if ( errorResponse && data && data.error ) {
    responseObj.errors = [
      {
        status: status,
        title:  statusText,
        detail: data.error
      }
    ]

  }
  // if the errorResponse has a data.message property
  // handle a different error response
  else if ( errorResponse && data && data.message ) {
    responseObj.errors = [
      {
        status: status,
        title:  statusText,
        detail: data.message
      }
    ]

  }
  // handle additional field errors
  else if ( errorResponse && _.size( data ) > 0 )
  {
    const errorsArray = []

    _.forOwn( errorResponse.data, (value, key) => {
      errorsArray.push(
        {
          source: { parameter: key },
          status: status,
          title:  statusText,
          detail: value.join(', ')
        }
      )

    })

    responseObj.errors = errorsArray

  }
  // else error is undetermined.
  // generate a generic response
  else {
    responseObj.errors = [
      {
        status: status,
        title:  statusText,
        detail: data
      }
    ]

  }

  // send the error response to the caller
  response.status( status )
          .json( responseObj )

}
