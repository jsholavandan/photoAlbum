"use strict";
var express = require("express");
var album_1 = require("../models/album");
var router = express.Router();
router.get('/', function (req, res) {
    var username = req.query.username;
    album_1.default.find({ username: username }).populate('photos').then(function (albums) {
        res.json(albums);
    }).catch(function (err) {
        res.status(500);
        console.error(err);
    });
});
router.get('/:id', function (req, res) {
    var albumId = req.params.id;
    console.log(albumId);
    album_1.default.findById(albumId).populate('photos').then(function (album) {
        console.log(album);
        res.json(album);
    });
});
router.post('/', function (req, res) {
    var obj = req.body;
    album_1.default.create(obj).then(function (album) {
        res.json(album);
    }).catch(function (err) {
        res.status(500);
        console.error(err);
    });
});
router.delete('/:id', function (req, res) {
    var albumId = req.params.id;
    album_1.default.remove({ _id: albumId }).then(function () {
        res.sendStatus(200);
    }).catch(function (err) {
        res.status(500);
        console.log(err);
    });
});
router.post('/:id', function (req, res) {
    var albumId = req.params.id;
    var photosArray = req.body.photos;
    album_1.default.findById(albumId).then(function (album) {
        album.albumCover = req.body.albumCover;
        album.photos = photosArray;
        album.save().then(function (updatedAlbum) {
            res.json(updatedAlbum);
        }).catch(function (err) {
            res.status(400).json(err);
        });
    }).catch(function (err) {
        res.sendStatus(404);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
