var User = require('../models/User_Mysql');
var Email_Token = require('../models/email_token');

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

exports.sendVerificationEmail = function (target_email_id, fromEmailAddress, subject, text, html, done) {
    // api key https://sendgrid.com/docs/Classroom/Send/api_keys.html
    var options = {
        auth: {
            api_key: process.env.sendgridkey
        }
    };

    var mailer = nodemailer.createTransport(sgTransport(options));

    var email = {
        to: [target_email_id],
        from: fromEmailAddress,
        subject: subject,
        text: text,
        html: html
    };

    mailer.sendMail(email, function (err, response) {
        if (err) {
            //console.log(err);
            return done(err);
        }
        done(null, response);
    });
    //
};