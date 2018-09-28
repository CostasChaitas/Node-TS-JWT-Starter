import * as express from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as helmet from "helmet";
import * as expressValidator from "express-validator";
import * as rateLimit from "express-rate-limit";

import { databaseDAO } from './db';
import { mainRoutes } from "./routes/MainRoutes";


class App {

  public app: express.Application;

  constructor() {

    this.app = express();
    this.config();

  }

  private config(): void {
    //env variables
    dotenv.config();
    //db connection
    databaseDAO.connect();

    //secure express app
    this.app.use(helmet())
    // support application/json
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    //support input validation
    this.app.use(expressValidator());

    //limiter
    //app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    });
    //  apply to all requests
    this.app.use(limiter);

    // Routing
    this.app.use("/api/v1", mainRoutes);
    

  }

}

export default new App().app;