import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { User } from "../models/User";


export class RegisterController {

  public root(req, res: Response) {
  
    try{

      req.checkBody('name', 'Enter a valid name').notEmpty().isLength({ min: 2 }).trim().escape();
      req.checkBody('password', 'Password should be minimum 8 characters').notEmpty().isLength({ min: 8 }).trim().escape();
      req.checkBody('email', 'Enter a valid email').notEmpty().isEmail().normalizeEmail().trim().escape();

      const errors = req.validationErrors();
      if (errors) return res.status(500).send(errors);
      

      User.findOne({ email: req.body.email }, (err, user) => {

        if (err) return res.status(500).send('Error on the server.');
        if (user) return res.status(404).send('Email already exist');

        bcrypt.hash(req.body.password, 10, (err, hash) => {

          if (err) return res.status(500).send("There was a problem registering the user.")
    
          User.create({
            name : req.body.name,
            email : req.body.email,
            password : hash
          }, (err, user) => {
      
            if (err) return res.status(500).send("There was a problem registering the user.")
            // create a token
            const token:string = jwt.sign({ id: user._id }, process.env.JWT_ACCESS, {
              expiresIn: 86400 // expires in 24 hours
            });
      
            res.status(200).send({ auth: true, token: token });
      
          }); 

        })

      });

    }catch(err){
      console.log(err)
      throw err;
    }
   

  }
}

export const registerController = new RegisterController();


