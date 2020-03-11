const logger = require('../middleware/logger');

class ErrorHandler extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
      this.is404 = statusCode ? 404 || true : false;
    }
  }

  const handleError = (err, req, res) => {
    const { statusCode, message, is404 } = err;
    
    logger.error(`${statusCode || 500} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    res.status(statusCode || 500);
    
    res.render('error.njk', {
        error: {
            status: statusCode || 500,
            is404: is404 || false,
            message: message || 'Internal Server Error',
        }
    });
  };

  module.exports = {
    ErrorHandler,
    handleError
  }