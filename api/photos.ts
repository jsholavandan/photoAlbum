import express = require('express');
import Photo from "../models/photo";

let router = express.Router();

router.get('/', (req, res) => {
  let username = req.query.username;
  console.log(username);
  Photo.find({username:username}).then((photos) => {
    console.log(photos);
    res.json(photos);
  }).catch((err) => {
    res.status(500);
    console.error(err);
  });
});

router.get('/:id', (req, res) => {
  let photoId = req.params.id;
  Photo.findById(photoId).then((photo) => {
    res.json(photo);
  });
});

router.post('/', (req, res) => {
  let obj = req.body;
  Photo.create(obj).then((photo) => {
    res.json({message: 'Photo saved.'});
  }).catch((err) => {
    res.status(500);
    console.error(err);
  });
});

router.delete('/:id', (req, res) => {
  let photoId = req.params.id;
  Photo.remove({_id:photoId}). then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    res.status(500);
    console.log(err);
  });
});

router.post('/:id', (req, res) => {
  let photoId = req.params.id;
  Photo.findById(photoId).then((photo) => {
    photo.caption = req.body.caption;

    photo.save().then((updatedPhoto) => {
      res.json(updatedPhoto);
    }).catch((err) =>{
      res.status(400).json(err);
    });
  }).catch((err) => {
    res.sendStatus(404);
  });
});

export default router;
