//var bcrypt = require('bcryptjs');
var db = require('../db.js');
var SQLHelper = require('../helpers/sqlHelper');
var squel = require("squel");
var crypto = require('crypto');
var User = require('./User_mysql');
var tableName = "password_change_requests";
var tableColumns = ["users_id", "token", "time"];

exports.create = function (user_id, done) {
    // Create the token
    crypto.randomBytes(20, function (err, buf) {
        if (err) return done(err);
        var token = buf.toString('hex');
        //token obtained
        var values = [user_id, token];
        var insertColumns = ["users_id", "token"];
        var sql = squel.insert()
            .into(tableName);
        for (var i = 0; i < insertColumns.length; i++) {
            sql.set(insertColumns[i], "?", {dontQuote: true});
        }
        sql.set(tableColumns[2], "DATE_ADD(NOW(), INTERVAL 24 HOUR)", {dontQuote: true});
        db.get().query(sql.toString(), values, function (err, result) {
            if (err) return done(err);
            //console.log("created user with name " + user_id + " with ID " + result.insertId);
            done(null, result.insertId, token);
        })
    });
};

exports.getByToken = function (token, done) {
    var values = [token];
    db.get().query('SELECT * FROM password_change_requests WHERE token = ?', values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.getByUserId = function (user_id, done) {
    var values = [user_id];
    db.get().query('SELECT * FROM password_change_requests WHERE users_id = ?', values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.deleteByToken = function(token){
    var values = [token];
    db.get().query('DELETE FROM password_change_requests WHERE token = ?', values, function (err, result) {
        if (err) return done(err);
        done(null, result);
    });
};

exports.deleteByUserId = function(user_id){
    var values = [user_id];
    db.get().query('DELETE FROM password_change_requests WHERE users_id = ?', values, function (err, result) {
        if (err) return done(err);
        done(null, result);
    });
};

exports.deleteBeforeTime = function(time){
    // time is string with format 2016-11-23 19:07:33 (yyyy-mm-dd hh:mm:ss)
    var values = [time];
    db.get().query('DELETE FROM password_change_requests WHERE time < ?', values, function (err, result) {
        if (err) return done(err);
        done(null, result);
    });
};