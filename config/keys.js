// determine which configuration to return

if ( process.env.NODE_ENV === 'production' ||
     process.env.NODE_ENV === 'sandbox' ) {
  // we are in production - return the production set of keys
  module.exports = require( './prod' )
}
else {
  // we are in dev mode - return the development set of keys
  module.exports = require( './dev' )
}

