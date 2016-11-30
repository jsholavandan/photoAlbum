"use strict";
var express = require("express");
var photo_1 = require("../models/photo");
var router = express.Router();
router.get('/', function (req, res) {
    var username = req.query.username;
    console.log(username);
    photo_1.default.find({ username: username }).then(function (photos) {
        console.log(photos);
        res.json(photos);
    }).catch(function (err) {
        res.status(500);
        console.error(err);
    });
});
router.get('/:id', function (req, res) {
    var photoId = req.params.id;
    photo_1.default.findById(photoId).then(function (photo) {
        res.json(photo);
    });
});
router.post('/', function (req, res) {
    var obj = req.body;
    photo_1.default.create(obj).then(function (photo) {
        res.json({ message: 'Photo saved.' });
    }).catch(function (err) {
        res.status(500);
        console.error(err);
    });
});
router.delete('/:id', function (req, res) {
    var photoId = req.params.id;
    photo_1.default.remove({ _id: photoId }).then(function () {
        res.sendStatus(200);
    }).catch(function (err) {
        res.status(500);
        console.log(err);
    });
});
router.post('/:id', function (req, res) {
    var photoId = req.params.id;
    photo_1.default.findById(photoId).then(function (photo) {
        photo.caption = req.body.caption;
        photo.save().then(function (updatedPhoto) {
            res.json(updatedPhoto);
        }).catch(function (err) {
            res.status(400).json(err);
        });
    }).catch(function (err) {
        res.sendStatus(404);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
