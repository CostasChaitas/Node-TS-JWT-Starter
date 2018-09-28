"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db");
var MainController = /** @class */ (function () {
    function MainController() {
    }
    MainController.prototype.root = function (req, res) {
        db_1.databaseDAO.connect();
        res.status(200).send({
            message: "GET request successful!!"
        });
    };
    return MainController;
}());
exports.MainController = MainController;
exports.mainController = new MainController();
//# sourceMappingURL=MainController.js.map