import express = require('express');
import mongoose = require('mongoose');

import User from '../models/user';

let router = express.Router();

router.post('/register', function(req, res, next){
  let user:any = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save(function(err, userSaved){
    if(err){
      res.send(err);
    }
    res.send('Registration is complete. Please login.');
  });

});

export default router;
