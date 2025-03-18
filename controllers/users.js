const express = require('express');
const router = express.Router();
const User = require('../models/user.js')

// GET /users/:userId/show
router.get("/:userId/show", async (req, res) => {
  try {
    const communityMember = await User.findById(req.params.userId);
    res.render('users/show.ejs', {
      name: communityMember,
      pantry: communityMember.pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// GET /users  <- already here
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.render('users/index.ejs', {
    allUsers: users,
  });
});

module.exports = router;

// Add a link for each user’s show page in the rendered community list.
// On each user’s show page, render a list of that user’s pantry items.
// This list should be read-only.
// Test your new community page.