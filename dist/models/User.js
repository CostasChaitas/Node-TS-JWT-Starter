"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
mongoose.model('User', UserSchema);
exports.User = mongoose.model('User');
//# sourceMappingURL=User.js.map