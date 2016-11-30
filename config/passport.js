"use strict";
var passport = require("passport");
var mongoose = require("mongoose");
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
passport.use(new LocalStrategy(function (username, password, done) {
    console.log(username + " - " + password);
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Incorrect user' });
        }
        if (!user.validatePassword(password)) {
            return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
    });
}));
