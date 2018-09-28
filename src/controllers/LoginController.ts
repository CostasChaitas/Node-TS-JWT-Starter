import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { User } from "../models/User";

export class LoginController {

  public root(req, res: Response) {

    try{

      req.checkBody('password', 'Password should be minimum 8 characters').notEmpty().isLength({ min: 8 }).trim().escape();
      req.checkBody('email', 'Enter a valid email').notEmpty().isEmail().normalizeEmail().trim().escape();

      const errors = req.validationErrors();
      if (errors) return res.status(500).send(errors);

      User.findOne({ email: req.body.email }, (err, user) => {

        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('Unauthorized Access');

        bcrypt.compare( req.body.password, user.password, (err, passwordIsValid) => {

          if (err) return res.status(500).send('Error on the server.');
          if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

          const token:string = jwt.sign({ id: user._id }, process.env.JWT_ACCESS, {
            expiresIn: 86400 // expires in 24 hours
          });

          res.status(200).send({ auth: true, token: token });
          
        });
        
      });

    
    }catch(err){
      console.log(err);
      throw err
    }

    

  }
}

export const loginController = new LoginController();


