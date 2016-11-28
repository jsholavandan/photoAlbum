import express = require('express');
import Album from "../models/album";


let router = express.Router();

router.get('/', (req, res) => {
  let username = req.query.username;
  Album.find({username:username}).populate('photos').then((albums) => {
    res.json(albums);
  }).catch((err) => {
    res.status(500);
    console.error(err);
  });
});

router.get('/:id', (req, res) => {
  let albumId = req.params.id;
  console.log(albumId);
  Album.findById(albumId).populate('photos').then((album) =>{
    console.log(album);
    res.json(album);
  });
});

router.post('/', (req, res) => {
  let obj = req.body;
  Album.create(obj).then((album) => {
    res.json(album);
  }).catch((err) => {
    res.status(500);
    console.error(err);
  });
});

router.delete('/:id', (req, res) => {
  let albumId = req.params.id;
  Album.remove({_id:albumId}).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    res.status(500);
    console.log(err);
  });
});

router.post('/:id', (req, res) => {
  let albumId = req.params.id;
  let photosArray = req.body.photos;
  Album.findById(albumId).then((album) => {
    album.albumCover = req.body.albumCover;
    album.photos = photosArray;
    album.save().then((updatedAlbum) => {
      res.json(updatedAlbum);
    }).catch((err) => {
      res.status(400).json(err);
    });

  }).catch((err) => {
    res.sendStatus(404);
  })

});

export default router;
