"use strict";
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var photos_1 = require("./api/photos");
var albums_1 = require("./api/albums");
var users_1 = require("./routes/users");
var register_1 = require("./routes/register");
require('./models/user');
require('./config/passport');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
app.use('/api', express.static(path.join(__dirname, 'api')));
app.use('/api/photos', photos_1.default);
app.use('/api/albums', albums_1.default);
app.use(passport.initialize());
app.use('/routes/users', users_1.default);
app.use('/routes/register', register_1.default);
app.use('/api', require('./api/makes'));
app.use('/api', require('./api/cars'));
app.use('/api', require('./api/movies'));
app.use('/api', require('./api/genres'));
app.use('/api', require('./api/guestbook'));
app.use('/api', require('./api/deepThought'));
mongoose.connect('mongodb://jayshol:saibaba@ds151117.mlab.com:51117/photoalbum');
app.get('/*', function (req, res, next) {
    if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
        return next({ status: 404, message: 'Not Found' });
    }
    else {
        return res.render('index');
    }
});
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.use(function (err, req, res, next) {
    res.status(err['status'] || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
