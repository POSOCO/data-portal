var express = require('express');
var router = express.Router();
var User = require('../models/User_Mysql');
var ConstData = require('../models/const_data');

router.get('/showusers', function (req, res, next) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    User.get(7, function (err, users) {
        if (err) {
            return done(err);
        }
        res.json({users: users});
    });

});

router.get('/get_keys_by_date_range', function (req, res, next) {
    ConstData.getByKeyDateRange(["kstps_tot_mu", "mouda_tot_mu"], "2017-04-01", "2017-04-17", function (err, rows) {
        if (err) {
            return next(err);
        }
        res.json({'data': rows});
    });
});

module.exports = router;
