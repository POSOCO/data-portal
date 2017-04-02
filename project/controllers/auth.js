var express = require('express');
var router = express.Router();
var passport = require('../config/passport').get();

router.get('/login', function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    res.render('login.ejs', {message: req.flash('loginMessage')});
});

router.get('/signup', function (req, res) {
    res.render('signup.ejs', {message: req.flash('signupMessage')});
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

/*
 router.post('/signup', passport.authenticate('local-signup', {
 successRedirect: '/signupemailsent',
 failureRedirect: '/login',
 failureFlash: true
 }));
 */
router.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        return res.redirect('/home');
    })(req, res, next);
});

router.post('/*', isLoggedIn, function (req, res, next) {
    //console.log('caught a post request');
    next();
});

router.put('/*', isLoggedIn, function (req, res, next) {
    //console.log('caught a put request');
    next();
});

function isLoggedIn(req, res, next) {
    //console.log("reached isLoggedIn...");
    if (req.url === '/forgot' || req.url == "/resetpassword" || req.url == "/api/orders/") return next();
    if (req.isAuthenticated()) {
        return next();
    }
    //res.redirect('/login');
    res.json({redirect: '/login'});
}

module.exports = router;