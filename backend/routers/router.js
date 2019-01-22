'use strict';
const path = require('path')
module.exports = (express, authService, routerService) => {
    const router = express.Router();
    require('./authRouter')(router, authService)
    require('./profileRouter')(router, authService, routerService)
    return router;
};
