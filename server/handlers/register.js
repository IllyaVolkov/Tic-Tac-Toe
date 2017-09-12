var pool = require('../database/connectionPool');
var queries = require('../database/queries');

function register(req, res) {
    pool.getConnection(function (err, connection) {
        var data = req.body;
        if (err) {
            console.log(err.stack);
            res.status(500).send({
                success: false
            });
            return;
        }
        var query = queries.insertUser(data, connection);

        query.on('end', function() {
            connection.release();
            res.status(201).send({
                success: true
            });
        });
        query.on('error', function(err) {
            connection.release();
            res.status(401).send({
                success: false
            });
        });
    });
}

module.exports = register;