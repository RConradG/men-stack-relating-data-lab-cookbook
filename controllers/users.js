const express = require('express');
const router = express.Router();
const User = require('../models/user.js')

// GET /users/:userId/foods
router.get("/:userId/foods", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("users/show.ejs", {
      pantry: currentUser.pantry,
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