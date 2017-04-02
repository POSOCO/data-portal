var express = require('express');
var router = express.Router();
var Const_Data = require('../models/const_data.js');

router.get('/', function (req, res, next) {
    //console.log("get req params for get single are " + JSON.stringify(req.query));
    Const_Data.get(req.query.id, function (err, rows) {
        if (err) {
            return next(err);
        }
        res.json({'data': rows});
    });
});


router.post('/', function (req, res, next) {
    var time_str = req.body["time_str"];
    var key_str = req.body["key_str"];
    var val_str = req.body["val_str"];

    //console.log("Data is " + JSON.stringify(req["body"]["data[]"]));
    Const_Data.create(time_str, key_str, val_str, function (err, insertId) {
        if (err) {
            return next(err);
        }
        res.json({'insertId': insertId});
    });
});

router.post('/create', function (req, res, next) {
    var keys = req["body"]["keys[]"];
    var vals = req["body"]["vals[]"];

    res.json({'data': req.body});
    /*Const_Data.create(time_str, key_str, val_str, function (err, insertId) {
        if (err) {
            return next(err);
        }
        res.json({'insertId': insertId});
    });*/
});


router.put('/', function (req, res, next) {
    if (req.user.username != "admin") {
        return next(new Error("user is not admin"));
    }
    var id = req.body["id"];
    var time_str = req.body["time_str"];
    var key_str = req.body["key_str"];
    var val_str = req.body["val_str"];

    Const_Data.update(id, time_str, key_str, val_str, function (err, result) {
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
    Const_Data.delete(id, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json({"affectedRows": result});
    });
});


module.exports = router;