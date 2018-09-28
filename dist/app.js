"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var helmet = require("helmet");
var expressValidator = require("express-validator");
var rateLimit = require("express-rate-limit");
var db_1 = require("./db");
var MainRoutes_1 = require("./routes/MainRoutes");
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.config();
    }
    App.prototype.config = function () {
        //env variables
        dotenv.config();
        //db connection
        db_1.databaseDAO.connect();
        //secure express app
        this.app.use(helmet());
        // support application/json
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //support input validation
        this.app.use(expressValidator());
        //limiter
        //app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
        var limiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100 // limit each IP to 100 requests per windowMs
        });
        //  apply to all requests
        this.app.use(limiter);
        // Routing
        this.app.use("/api/v1", MainRoutes_1.mainRoutes);
    };
    return App;
}());
exports.default = new App().app;
//# sourceMappingURL=app.js.map