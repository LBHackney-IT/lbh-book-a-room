// log errors to console in development mode
const keys = require('../config/keys')


module.exports = (error, request, response, next) => {
  // if in development, send the stack trace to the console
  if ( keys.isDevelopment ) {
    console.log( error.stack )
  }

  next( error )
}
