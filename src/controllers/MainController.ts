import { Request, Response } from "express";
import { databaseDAO } from '../db';


export class MainController {
  public root(req: Request, res: Response) {

    databaseDAO.connect();
    res.status(200).send({
      message: "GET request successful!!"
    });
  }
}

export const mainController = new MainController();


