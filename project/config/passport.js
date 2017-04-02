var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User_Mysql');
var Email_Token = require('../models/email_token');
var Email_Helper = require('../helpers/mailHelper');
var passport = require('passport');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.get(id, function (err, users) {
        done(err, users[0]);
    });
});

passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        process.nextTick(function () {
            User.getByName(email, function (err, users) {
                if (err)
                    return done(err);
                if (users[0]) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken'));
                } else {
                    if (req.param('password') != req.param('confirmpassword')) {
                        return done(null, false, req.flash('loginMessage', "password and confirm password fields did not match"));
                    }
                    User.create(email, User.generateHash(password), req.param('usermail'), req.param('full_name'), req.param('phone'), req.param('address'), function (err, userId) {
                        if (err)
                            return done(err);
                        User.get(userId, function (err, users) {
                            if (err) return done(err);
                            return done(null, users[0]);
                        });
                    });
                }
            });
        });
    }));

passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        process.nextTick(function () {
            User.getByName(email, function (err, users) {
                if (err)
                    return done(err);
                if (!users[0])
                    return done(null, false, req.flash('loginMessage', 'No User found'));
                if (!User.validPassword(password, users[0].password)) {
                    return done(null, false, req.flash('loginMessage', 'invalid password'));
                }
                return done(null, users[0]);
            });
        });
    }
));

exports.get = function () {
    return passport;
};