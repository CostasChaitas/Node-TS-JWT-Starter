import * as express from "express";

import VerifyToken from "../auth/VerifyToken"

import { mainController } from "../controllers/MainController";
import { registerController } from "../controllers/RegisterController";
import { loginController } from "../controllers/loginController";
import { findMeController } from "../controllers/findMeController";

class MainRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.main();
  }

  private main(): void {

    this.router.get("/", (req: express.Request, res: express.Response) =>
      mainController.root(req, res)
    );

    this.router.post("/register", (req: express.Request, res: express.Response) =>
      registerController.root(req, res)
    );

    this.router.post("/login", (req: express.Request, res: express.Response) =>
      loginController.root(req, res)
    );

    this.router.post("/me", VerifyToken, (req: express.Request, res: express.Response, next:express.NextFunction) =>
      findMeController.root(req, res)
    );

  }
}

export const mainRoutes = new MainRoutes().router;