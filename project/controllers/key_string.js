var express = require('express');
var router = express.Router();
var KeyString = require('../models/key_string.js');

router.get('/', function (req, res, next) {
    //console.log("get req params for get single are " + JSON.stringify(req.query));
    KeyString.getByUser(req.query.user_id, function (err, rows) {
        if (err) {
            return next(err);
        }
        res.json({'keys': rows});
    });
});

router.post('/', function (req, res, next) {
    if (req.user.username != "admin") {
        return next(new Error("user is not admin"));
    }
    var key_str = req.body["key_str"];
    var key_info = req.body["key_info"];
    var key_desc = req.body["key_desc"];
    var user_id = req.body["user_id"];

    //console.log("Username is " + req.user.username);
    KeyString.create(key_str, key_info, key_desc, user_id, function (err, insertId) {
        if (err) {
            return next(err);
        }
        res.json({'insertId': insertId});
    });
});

router.post('/create', function (req, res, next) {
    if (req.user.username != "admin") {
        return next(new Error("user is not admin"));
    }
    var key_str = req.body["key_str[]"];
    var key_info = req.body["key_info[]"];
    var key_desc = req.body["key_desc[]"];
    var user_id = req.body["user_id[]"];
    if(key_str.constructor !== Array){
        key_str = [key_str];
    }
    if(key_info.constructor !== Array){
        key_info = [key_info];
    }
    if(key_desc.constructor !== Array){
        key_desc = [key_desc];
    }
    if(user_id.constructor !== Array){
        user_id = [user_id];
    }
    //console.log(req.body);
    KeyString.createArray(key_str, key_info, key_desc, user_id, function (err, insertId) {
        if (err) {
            return next(err);
        }
        res.json({'insertId': insertId});
    });
});

router.put('/', function (req, res, next) {
    if (req.user.username != "admin") {
        return next(new Error("user is not admin"));
    }
    var key_str = req.body["key_str"];
    var key_info = req.body["key_info"];
    var key_desc = req.body["key_desc"];
    var user_id = req.body["user_id"];

    //console.log("Username is " + req.user.username);
    KeyString.update(key_str, key_info, key_desc, user_id, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json({"changedRows": result});
    });
});

router.delete('/', function (req, res, next) {
    if (req.user.username != "admin") {
        return next(new Error("user is admin"));
    }
    var id = req.body["id"];
    KeyString.delete(id, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json({"affectedRows":result});
    });
});

module.exports = router;