require('dotenv').config();
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

router.post("/register", async(req, res) => {

  try{

    const username = req.body.email;
    const password = req.body.password;
    if(!username){
      return res.json({error: 'Email is required'});
    }
    if(!password){
      return res.json({error: 'Password is required'});
    }

    const exist = await User.findOne({username});
    if(exist) {
      return res.json({
        error: "Email is already in use"
      })
    }

    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        const user = User.create({
          username, 
          password: hash,
          history: {},
        });
        jwt.sign({email: username, id: user._id}, process.env.SECRET_KEY, {}, (err, token) => {
          if(err) throw err;
          res.cookie('token', token).json(user);
        });
      });
    });
  }
  catch(err){
    console.log(err);
  }

  
});

router.post('/login', async(req, res, next) => {

  const username = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({username});
  if(!user){
    return res.json({error: "No user found"});
  }  

  bcrypt.compare(password, user.password, function(err, result) {
    if(err){
      res.json({error: err});
    }
    if(result === true){
      jwt.sign({email: username, id: user._id}, process.env.SECRET_KEY, {}, (err, token) => {
        if(err) throw err;
        res.cookie('token', token).json(user);
      });
    }
    else{
      res.json({error: "Wrong Password"});
    }
  });

});


router.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200).json({ message: 'Logout successful' });
});

module.exports = router;