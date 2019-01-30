module.exports = (app, express, bodyParser, cors, router, path) => {
    app.use(express.static(path.join(__dirname,'..','public')));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors({
        // origin: `http://${process.env.FRONTEND_URL}`,
        origin: String(process.env.FRONTEND_URL),
        credentials: true 
    }));
    app.use(router);
}