const expressLoader = require('./express');

module.exports = {
    init: async ({ expressApp }) => {

        await expressLoader.init( expressApp );
        console.log('Express Intialized');
    }

}