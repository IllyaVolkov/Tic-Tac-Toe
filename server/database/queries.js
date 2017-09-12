"use strict";

const mysql = require('mysql');

module.exports = {
    selectedRow: null,
    selectedRowArray: null,

    insertUser(data, connection) {
        var queryString = 'INSERT INTO `EnterData` (Login, Password, Email, Name) VALUES (?, ?, ?, ?)';
        var queryToSend = mysql.format(queryString, [data.login, data.password, data.email, data.name]);
        let query = connection.query(queryToSend, function (err, rows) {});
        return query;
    },

    getUserDataByLogin(login, connection) {
        var self = this;
        var queryString = 'SELECT * FROM `EnterData` WHERE Login=?';
        var queryToSend = mysql.format(queryString, [login]);
        let query = connection.query(queryToSend, function (err, rows) {
            if (err) {
                return;
            }
            self.selectedRow = rows[0];
        });
        return query;
    },

    increaseRank(login, connection) {
        var self = this;
        var queryString = 'UPDATE `EnterData` SET Rank = Rank + 1 WHERE Login=?';
        var queryToSend = mysql.format(queryString, [login]);
        let query = connection.query(queryToSend, function (err, rows) {
            if (err) {
                return;
            }
        });
        return query;
    },

    decreaseRank(login, connection) {
        var self = this;
        var queryString = 'UPDATE `EnterData` SET Rank = Rank - 1 WHERE Login=?';
        var queryToSend = mysql.format(queryString, [login]);
        let query = connection.query(queryToSend, function (err, rows) {
            if (err) {
                return;
            }
        });
        return query;
    },

    doubleDecreaseRank(login, connection) {
        var self = this;
        var queryString = 'UPDATE `EnterData` SET Rank = Rank - 2 WHERE Login=?';
        var queryToSend = mysql.format(queryString, [login]);
        let query = connection.query(queryToSend, function (err, rows) {
            if (err) {
                return;
            }
        });
        return query;
    }
};