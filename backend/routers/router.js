'use strict';
const path = require('path')
module.exports = (express, passport, authService) => {
    const router = express.Router();
    
    require('./authRouter')(router, passport, authService)

    router.use('*', (req, res) => res.sendFile(path.join(__dirname, '..' ,'public' , 'index.html')))
    return router;
};
