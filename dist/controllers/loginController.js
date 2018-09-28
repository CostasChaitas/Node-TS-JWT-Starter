"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User_1 = require("../models/User");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.root = function (req, res) {
        try {
            req.checkBody('password', 'Password should be minimum 8 characters').notEmpty().isLength({ min: 8 }).trim().escape();
            req.checkBody('email', 'Enter a valid email').notEmpty().isEmail().normalizeEmail().trim().escape();
            var errors = req.validationErrors();
            if (errors)
                return res.status(500).send(errors);
            User_1.User.findOne({ email: req.body.email }, function (err, user) {
                if (err)
                    return res.status(500).send('Error on the server.');
                if (!user)
                    return res.status(404).send('Unauthorized Access');
                bcrypt.compare(req.body.password, user.password, function (err, passwordIsValid) {
                    if (err)
                        return res.status(500).send('Error on the server.');
                    if (!passwordIsValid)
                        return res.status(401).send({ auth: false, token: null });
                    var token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.status(200).send({ auth: true, token: token });
                });
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    };
    return LoginController;
}());
exports.LoginController = LoginController;
exports.loginController = new LoginController();
//# sourceMappingURL=loginController.js.map