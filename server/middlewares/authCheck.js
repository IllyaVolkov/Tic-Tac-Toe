var jwt = require('jsonwebtoken');
const SECRET = require('../constants/constants').SECRET;

function checkAuth(req, res, next) {
    var token = req.headers['x-access-token'];

    if (!token) {
        res.status(403).end();
        return;
    }
    jwt.verify(token, SECRET, function(err, decoded) {
        if (err) {
            res.status(403).end();
        } else {
            req.user = decoded;
            next();
        }
    });
}

module.exports = checkAuth;