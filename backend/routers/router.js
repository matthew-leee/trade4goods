'use strict';
const path = require('path')
module.exports = (express, authService, routerService) => {
    const router = express.Router();
    require('./authRouter')(router, authService)
    require('./pingPongRouter')(router)
    require('./profileRouter')(router, authService, routerService)
    return router;
};
