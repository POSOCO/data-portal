//var bcrypt = require('bcryptjs');
var db = require('../db.js');
var SQLHelper = require('../helpers/sqlHelper');
var squel = require("squel");
var crypto = require('crypto');
var User = require('./User_mysql');
var tableName = "users_verification";
var tableColumns = ["id", "users_id", "token", "expires_at", "created_at", "updated_at"];

exports.create = function (username, done) {
    var token = "";
    User.getByName(username, function (err, users) {
        if (err) return done(err);
        //user id obtained
        var user_id = users[0].id;
        //now create the token
        crypto.randomBytes(20, function (err, buf) {
            if (err) return done(err);
            var token = buf.toString('hex');
            //token obtained
            var values = [user_id, token];
            var insertColumns= ["users_id", "token"];
            var sql = squel.insert()
                .into(tableName);
            for (var i = 0; i < insertColumns.length; i++) {
                sql.set(insertColumns[i], "?", {dontQuote: true});
            }
            db.get().query(sql.toString(), values, function (err, result) {
                if (err) return done(err);
                //console.log("created user with name " + user_id + " with ID " + result.insertId);
                done(null, result.insertId);
            })
        });
    });
};

exports.get = function (id, done) {
    var values = [id];
    db.get().query('SELECT * FROM users_verification WHERE id = ?', values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.getByUserId = function (user_id, done) {
    var values = [user_id];
    db.get().query('SELECT * FROM users_verification WHERE users_id = ?', values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.getByToken = function (token, done) {
    var values = [token];
    db.get().query('SELECT * FROM users_verification WHERE token = ?', values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};