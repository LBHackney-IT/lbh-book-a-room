const config = require('./config');
const loaders = require('./loaders');
const logger = require('./middleware/logger');

const express = require('express');

async function startServer() {
  const app = express();

  await loaders.init({ expressApp: app });

  app.listen(config.port, err => {
    if (err) {
      logger.error(`${err}`);

      return;
    }
    console.log(`Your server is ready !`);
    logger.info('Listening on port: ' + config.port);
  });
}

startServer();