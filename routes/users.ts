import * as express from 'express';
import * as mongoose from 'mongoose';
import passport = require('passport');
import jwt = require('jsonwebtoken');

import User from '../models/user';

let router = express.Router();



/* GET users listing. */
router.post('/login', function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  if(!username || !password){
    return res.status(400).send("Please fill out every field");
  }
  passport.authenticate('local', function(err, user, info) {
    if(err){
      return next(err);
    }
    if(user){
      let token = user.generateJWT();
      console.log("token "+ token);
      res.json({ token : user.generateJWT() });
    }
    res.status(400).send(info);
  })(req, res, next);

});

export default router;
