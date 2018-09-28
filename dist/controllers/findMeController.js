"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../models/User");
var FindMeController = /** @class */ (function () {
    function FindMeController() {
    }
    FindMeController.prototype.root = function (req, res) {
        console.log(req.body);
        User_1.User.findById(req.body.userId, { password: 0 }, function (err, user) {
            if (err)
                return res.status(500).send("There was a problem finding the user.");
            if (!user)
                return res.status(404).send("No user found.");
            res.status(200).send(user);
        });
    };
    return FindMeController;
}());
exports.FindMeController = FindMeController;
exports.findMeController = new FindMeController();
//# sourceMappingURL=findMeController.js.map