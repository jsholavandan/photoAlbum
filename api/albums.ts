import express = require('express');
import Album from "../models/album";


let router = express.Router();

router.get('/albums', (req, res) => {
  Album.find().populate('photos').then((albums) => {
    res.json(albums);
  }).catch((err) => {
    res.status(500);
    console.error(err);
  });
});

export default router;
