module.exports = (express, authService, routerService, productService, path) => {
    const router = express.Router();
    require('./authRouter')(router, authService)
    require('./allP')(router)
    require('./profileRouter')(router, authService, routerService)
    router.get('/*', (req, res) => res.sendFile(path.join(__dirname,'..','public','index.html')));
    return router;
};
