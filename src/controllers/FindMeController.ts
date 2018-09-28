import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { User } from "../models/User";

export class FindMeController {

  public root(req: Request, res: Response) {

    console.log(req.body)

    User.findById(req.body.userId, { password: 0 },  (err, user) => {

      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
        
      res.status(200).send(user);
    })

  }
}

export const findMeController = new FindMeController();


