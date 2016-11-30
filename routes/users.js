"use strict";
var express = require("express");
var passport = require("passport");
var router = express.Router();
router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if (!username || !password) {
        return res.status(400).send("Please fill out every field");
    }
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (user) {
            var token = user.generateJWT();
            console.log("token " + token);
            res.json({ token: user.generateJWT() });
        }
        res.status(400).send(info);
    })(req, res, next);
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
