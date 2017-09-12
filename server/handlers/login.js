var jwt = require('jsonwebtoken');
var pool = require('../database/connectionPool');
var queries = require('../database/queries');

const SECRET = require('../constants/constants').SECRET;

function login(req, res) {
    var login = req.body.login;
    var password = req.body.password;

    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err.stack);
            res.status(500).send({
                success: false
            });
            return;
        }
        var query = queries.getUserDataByLogin(login, connection);

        query.on('end', function() {
            connection.release();
            if (queries.selectedRow && queries.selectedRow.Password === password) {
                var currentUser = {
                    Login: queries.selectedRow.Login,
                    Password: queries.selectedRow.Password,
                    Name: queries.selectedRow.Name,
                    Email: queries.selectedRow.Email,
                    Rank: queries.selectedRow.Rank
                };
                var token = jwt.sign(currentUser, SECRET);
                currentUser.Password = null;
                res.send({
                    success: true,
                    token: token,
                    userData: currentUser
                });
            } else {
                res.status(401).send({
                    success: false
                });
            }
        });
        query.on('error', function(err) {
            connection.release();
            res.status(401).send({
                success: false
            });
        });
    });
}

module.exports = login;