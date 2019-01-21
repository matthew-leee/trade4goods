'use strict';
const path = require('path')
module.exports = (express, authService) => {
    const router = express.Router();
    require('./authRouter')(router, authService)

    // index.html for dev test only
    // router.use('*', (req, res) => res.sendFile(path.join(__dirname, '..' ,'public' , 'index.html')))
    return router;
};
