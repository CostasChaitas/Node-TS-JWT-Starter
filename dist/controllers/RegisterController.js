"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User_1 = require("../models/User");
var RegisterController = /** @class */ (function () {
    function RegisterController() {
    }
    RegisterController.prototype.root = function (req, res) {
        try {
            req.checkBody('name', 'Enter a valid name').notEmpty().isLength({ min: 2 }).trim().escape();
            req.checkBody('password', 'Password should be minimum 8 characters').notEmpty().isLength({ min: 8 }).trim().escape();
            req.checkBody('email', 'Enter a valid email').notEmpty().isEmail().normalizeEmail().trim().escape();
            var errors = req.validationErrors();
            if (errors)
                return res.status(500).send(errors);
            User_1.User.findOne({ email: req.body.email }, function (err, user) {
                if (err)
                    return res.status(500).send('Error on the server.');
                if (user)
                    return res.status(404).send('Email already exist');
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err)
                        return res.status(500).send("There was a problem registering the user.");
                    User_1.User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }, function (err, user) {
                        if (err)
                            return res.status(500).send("There was a problem registering the user.");
                        // create a token
                        var token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        res.status(200).send({ auth: true, token: token });
                    });
                });
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    };
    return RegisterController;
}());
exports.RegisterController = RegisterController;
exports.registerController = new RegisterController();
//# sourceMappingURL=RegisterController.js.map