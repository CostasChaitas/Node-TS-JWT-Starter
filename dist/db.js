"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var DatabaseDAO = /** @class */ (function () {
    function DatabaseDAO() {
    }
    DatabaseDAO.prototype.connect = function () {
        mongoose.connect(process.env.DB_ACCESSS, { useNewUrlParser: true }, function (err, res) {
            if (err) {
                console.log('ERROR connecting to MongoDB' + '. ' + err);
            }
            else {
                console.log('Succeeded connected to MongoDB ');
            }
        });
        var db = mongoose.connection;
        db.on('error', function (err) {
            console.log("Mongoose default connection has occured " + err + " error");
        });
        db.on('disconnected', function () {
            console.log("Mongoose default connection is disconnected");
        });
        process.on('SIGINT', function () {
            db.close(function () {
                console.log("Mongoose default connection is disconnected due to application termination");
                process.exit(0);
            });
        });
    };
    return DatabaseDAO;
}());
exports.databaseDAO = new DatabaseDAO();
//# sourceMappingURL=db.js.map