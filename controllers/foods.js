const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// GET /users/:userID/foods <- already here

router.get('/', async (req, res) => {
  // res.send("this is the pantry that shows foods")
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('foods/index.ejs', {
      foods: currentUser.foods
    });
  } catch(error) {
    console.log(error);
    res.redirect('/');
  };
});

// GET /users/:userID/foods/new

router.get('/new', async (req, res) => {
  res.send("checking");
});


module.exports = router;