var db = require('../db.js');
var squel = require("squel");
var tableName = "key_strings";
var tableColumns = ["key_str", "type_info", "description", "users_id"];

exports.get = function (key_str, done) {
    var sql = squel.select()
        .from(tableName);
    if (key_str != null && !isNaN(key_str)) {//qualifies if key_str != "" and key_str!=null and key_str is a number
        sql.where("key_str = " + key_str);
    }
    //console.log("sql for Approval get is " + sql);
    db.get().query(sql.toString(), function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.getByUser = function (user_id, done) {
    var sql = squel.select()
        .from(tableName);
    if (user_id != null) {//qualifies if user_id != "" and user_id!=null
        sql.where("users_id = " + user_id);
    }
    //console.log("sql for Approval getByName is " + sql);
    db.get().query(sql.toString(), function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.getByKeys = function (keys, done) {
    var sql = squel.select()
        .from(tableName);
    if (keys != null) {//qualifies if keys != "" and keys!=null
        sql.where("key_str IN ?", keys);
    }
    //console.log("sql for Approval getByName is " + sql.toString());
    //console.log("sql for Approval getByName is " + JSON.stringify(sql.toParam()));
    db.get().query(sql.toParam().text, sql.toParam().values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.create = function (key_str, key_info, key_desc, user_id, done) {
    var insertColumns = tableColumns;
    var values = [key_str, key_info, key_desc, user_id];
    var sql = squel.insert()
        .into(tableName);
    for (var i = 0; i < insertColumns.length; i++) {
        sql.set(insertColumns[i], "?", {dontQuote: true});
    }
    //console.log("The Approval update SQL query is " + sql.toString());
    db.get().query(sql.toString(), values, function (err, result) {
        if (err) return done(err);
        done(null, result.insertId);
    });
};

exports.createArray = function (key_str, key_info, key_desc, user_id, done) {
    var insertColumns = tableColumns;
    var rowsArray = [];
    console.log("The rows are " + rowsArray);
    for (var i = 0; i < key_str.length; i++) {
        var rowObj = {};
        rowObj[tableColumns[0]] = key_str[i];
        rowObj[tableColumns[1]] = key_info[i];
        rowObj[tableColumns[2]] = key_desc[i];
        rowObj[tableColumns[3]] = user_id[i];

        rowsArray.push(rowObj);
    }
    console.log("The rows are " + rowsArray);
    var sql = squel.insert()
        .into(tableName)
        .setFieldsRows(rowsArray);
    var query = sql.toParam().text;
    query += " ON DUPLICATE KEY UPDATE ";

    var updateStrs = [];
    updateStrs.push(tableColumns[0] + "=VALUES(" + tableColumns[0] + ")");
    updateStrs.push(tableColumns[1] + "=VALUES(" + tableColumns[1] + ")");
    updateStrs.push(tableColumns[2] + "=VALUES(" + tableColumns[2] + ")");
    updateStrs.push(tableColumns[3] + "=VALUES(" + tableColumns[3] + ")");

    query += updateStrs.join(", ");

    console.log("The keyString array create SQL query is " + query);
    //done(null, "result.insertId");

    db.get().query(query, sql.toParam().values, function (err, result) {
        if (err) return done(err);
        done(null, result.insertId);
    });
};

exports.update = function (key_str, key_info, key_desc, user_id, done) {
    var updateColumns = tableColumns.slice(1, tableColumns.length);
    var values = [key_info, key_desc, user_id];
    var sql = squel.update()
        .table(tableName);
    for (var i = 0; i < updateColumns.length; i++) {
        sql.set(updateColumns[i], "?", {dontQuote: true});
    }
    sql.where(tableColumns[0] + " = " + key_str);
    //console.log("The Approval update SQL query is " + sql.toString());
    db.get().query(sql.toString(), values, function (err, result) {
        if (err) return done(err);
        done(null, result.changedRows);
    });
};

exports.delete = function (key_str, done) {
    var sql = squel.delete()
        .from(tableName)
        .where(tableColumns[0] + " = " + key_str);
    //console.log("The Approval delete SQL query is " + sql.toString());
    db.get().query(sql.toString(), function (err, result) {
        if (err) return done(err);
        done(null, result.affectedRows);
    });
};