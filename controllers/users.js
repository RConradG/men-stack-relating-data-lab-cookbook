const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// GET /users/:userId/show
router.get('/:userId/show', async (req, res) => {
  try {
    const communityMember = await User.findById(req.params.userId);
    if (!communityMember) {
      return res.status(404).send('User not found');
    }

    res.render('users/show.ejs', {
      name: communityMember,
      pantry: communityMember.pantry,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).redirect('/');
  }
});

// GET /users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users/index.ejs', {
      allUsers: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).redirect('/');
  }
});

module.exports = router;
