"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {
        var token = req.headers.authorization.split(' ')[1];
        if (!token)
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        jwt.verify(token, process.env.JWT_ACCESS, function (err, decoded) {
            if (err)
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            // if everything good, save to request for use in other routes
            req.body.userId = decoded.id;
            next();
        });
    }
    else {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
}
exports.default = verifyToken;
//# sourceMappingURL=VerifyToken.js.map