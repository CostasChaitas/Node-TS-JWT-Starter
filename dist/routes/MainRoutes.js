"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var VerifyToken_1 = require("../auth/VerifyToken");
var MainController_1 = require("../controllers/MainController");
var RegisterController_1 = require("../controllers/RegisterController");
var loginController_1 = require("../controllers/loginController");
var findMeController_1 = require("../controllers/findMeController");
var MainRoutes = /** @class */ (function () {
    function MainRoutes() {
        this.router = express.Router();
        this.main();
    }
    MainRoutes.prototype.main = function () {
        this.router.get("/", function (req, res) {
            return MainController_1.mainController.root(req, res);
        });
        this.router.post("/register", function (req, res) {
            return RegisterController_1.registerController.root(req, res);
        });
        this.router.post("/login", function (req, res) {
            return loginController_1.loginController.root(req, res);
        });
        this.router.post("/me", VerifyToken_1.default, function (req, res, next) {
            return findMeController_1.findMeController.root(req, res);
        });
    };
    return MainRoutes;
}());
exports.mainRoutes = new MainRoutes().router;
//# sourceMappingURL=MainRoutes.js.map