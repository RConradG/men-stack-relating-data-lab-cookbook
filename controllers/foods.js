const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// GET /users/:userId/foods/:foodId/edit
router.get('/:foodId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user?._id);
    if (!currentUser) {
      return res.status(404).send('User not found');
    }

    const foodToEdit = currentUser.pantry.id(req.params.foodId);
    if (!foodToEdit) {
      return res.status(404).send('Food item not found');
    }

    res.render('foods/edit.ejs', { food: foodToEdit });
  } catch (error) {
    console.error('Error fetching food item for editing:', error);
    res.status(500).redirect('/');
  }
});

// GET /users/:userId/foods/new
router.get('/new', async (req, res) => {
  try {
    res.render('foods/new.ejs');
  } catch (error) {
    console.error('Error rendering new food form:', error);
    res.status(500).redirect('/');
  }
});

// PUT /users/:userId/foods/:foodId
router.put('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user?._id);
    if (!currentUser) {
      return res.status(404).send('User not found');
    }

    const foodToUpdate = currentUser.pantry.id(req.params.foodId);
    if (!foodToUpdate) {
      return res.status(404).send('Food item not found');
    }

    foodToUpdate.set(req.body);
    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.error('Error updating food item:', error);
    res.status(500).redirect('/');
  }
});

// DELETE /users/:userId/foods/:foodId
router.delete('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user?._id);
    if (!currentUser) {
      return res.status(404).send('User not found');
    }

    const foodItemToDelete = currentUser.pantry.id(req.params.foodId);
    if (!foodItemToDelete) {
      return res.status(404).send('Food item not found');
    }

    foodItemToDelete.deleteOne();
    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.error('Error deleting food item:', error);
    res.status(500).redirect('/');
  }
});

// GET /users/:userId/foods
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user?._id);
    if (!currentUser) {
      return res.status(404).send('User not found');
    }

    res.render('foods/index.ejs', { pantry: currentUser.pantry });
  } catch (error) {
    console.error('Error fetching pantry:', error);
    res.status(500).redirect('/');
  }
});

// POST /users/:userId/foods
router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user?._id);
    if (!currentUser) {
      return res.status(404).send('User not found');
    }

    if (!req.body.name || req.body.name.trim() === '') {
      return res.status(400).send('Food name is required');
    }

    currentUser.pantry.push({ name: req.body.name });
    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.error('Error adding new food item:', error);
    res.status(500).redirect('/');
  }
});

module.exports = router;
