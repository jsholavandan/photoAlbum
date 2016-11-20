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

router.post('/', (req, res) => {
  var obj = req.body;
  console.log("inside route");
  console.log(obj);
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

export default router;
