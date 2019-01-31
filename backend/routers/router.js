module.exports = (express, authService, profileService, productService, chatService, path) => {
    const router = express.Router();
    require('./authRouter')(router, authService)
    require('./profileRouter')(router, authService, profileService)
    require('./productRouter')(router, authService, productService)
    require('./chatRouter')(router, authService, chatService)
    router.get('/*', (req, res) => res.sendFile(path.join(__dirname,'..','public','index.html')));
    return router;
};