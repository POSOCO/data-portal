var db = require('../db.js');
var squel = require("squel");
var tableName = "const_data";
var tableColumns = ["id", "time", "key_string", "value_string"];

exports.get = function (id, done) {
    var sql = squel.select()
        .from(tableName);
    if (id != null && !isNaN(id)) {//qualifies if id != "" and id!=null and id is a number
        sql.where("id = " + id);
    }
    //console.log("sql for Approval get is " + sql);
    db.get().query(sql.toString(), function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.getByKeyDate = function (key_str_array, dateStr, done) {
    var sql = squel.select()
        .from(tableName);
    var q = squel.expr();
    var values = [];
    q.and("time = ?", dateStr);
    var q2 = squel.expr();
    if (key_str_array != null && key_str_array.constructor === Array) {//qualifies if key_str != "" and key_str!=null
        for (var i = 0; i < key_str_array.length; i++) {
            q2.or("key_string = ?", key_str_array[i]);
        }
        q.and(q2);
    }
    sql.where(q, {dontQuote: true});
    //console.log("sql for Approval getByName is " + JSON.stringify(sql.toParam()));
    db.get().query(sql.toParam().text, sql.toParam().values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.getByKeyDateRange = function (key_str_array, dateStr, dateStrEnd, done) {
    var sql = squel.select()
        .from(tableName);
    var q = squel.expr();
    var values = [];
    q.and("time BETWEEN ? AND ?", dateStr, dateStrEnd);
    var q2 = squel.expr();
    if (key_str_array != null && key_str_array.constructor === Array) {//qualifies if key_str != "" and key_str!=null
        for (var i = 0; i < key_str_array.length; i++) {
            q2.or("key_string = ?", key_str_array[i]);
        }
        q.and(q2);
    }
    sql.where(q, {dontQuote: true}).order("time");
    //console.log("sql for Approval getByName is " + JSON.stringify(sql.toParam()));
    db.get().query(sql.toParam().text, sql.toParam().values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.getByKey = function (key_str, done) {
    var sql = squel.select()
        .from(tableName);
    if (key_str != null) {//qualifies if key_str != "" and key_str!=null
        sql.where("key_string = " + key_str);
    }
    //console.log("sql for Approval getByName is " + sql);
    db.get().query(sql.toString(), function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.getByDate = function (date_str, done) {
    //todo if date given search between this date 00 hrs and next day 00 hrs using sql query
    var sql = squel.select()
        .from(tableName);
    if (date_str != null) {//qualifies if date_str != "" and date_str!=null
        sql.where("time = " + date_str);
    }
    //console.log("sql for Approval getByName is " + sql);
    db.get().query(sql.toString(), function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.create = function (time_str, key_str, val_str, done) {
    var insertColumns = tableColumns.slice(1, tableColumns.length);
    var values = [time_str, key_str, val_str];
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

exports.createArray = function (time_str, key_str, val_str, done) {
    var insertColumns = tableColumns.slice(1, tableColumns.length);
    var rowsArray = [];
    var timeColName = "time";
    var keyColName = "key_string";
    var valueColName = "value_string";

    for (var i = 0; i < key_str.length; i++) {
        var rowObj = {};
        rowObj[timeColName] = time_str[i];
        rowObj[keyColName] = key_str[i];
        rowObj[valueColName] = val_str[i];
        rowsArray.push(rowObj);
    }

    var sql = squel.insert()
        .into(tableName)
        .setFieldsRows(rowsArray);
    var query = sql.toParam().text;
    query += " ON DUPLICATE KEY UPDATE ";

    var updateStrs = [];
    updateStrs.push(valueColName + "=VALUES(" + valueColName + ")");

    query += updateStrs.join(", ");

    console.log("The constdata create SQL query is " + query);
    //done(null, "result.insertId");

    db.get().query(query, sql.toParam().values, function (err, result) {
        if (err) return done(err);
        done(null, result.insertId);
    });
};

exports.update = function (id, time_str, key_str, val_str, done) {
    var updateColumns = tableColumns.slice(1, tableColumns.length);
    var values = [time_str, key_str, val_str];
    var sql = squel.update()
        .table(tableName);
    for (var i = 0; i < updateColumns.length; i++) {
        sql.set(updateColumns[i], "?", {dontQuote: true});
    }
    sql.where(tableColumns[0] + " = " + id);
    //console.log("The Approval update SQL query is " + sql.toString());
    db.get().query(sql.toString(), values, function (err, result) {
        if (err) return done(err);
        done(null, result.changedRows);
    });
};

exports.delete = function (id, done) {
    var sql = squel.delete()
        .from(tableName)
        .where(tableColumns[0] + " = " + id);
    //console.log("The Approval delete SQL query is " + sql.toString());
    db.get().query(sql.toString(), function (err, result) {
        if (err) return done(err);
        done(null, result.affectedRows);
    });
};