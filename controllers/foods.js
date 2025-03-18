const express = require("express");
const router = express.Router();
const User = require("../models/user.js");



// GET /users/:userId/foods/:foodsId/edit
router.get('/:foodId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const foodToEdit = currentUser.pantry.id(req.params.foodId);
    res.render('foods/edit.ejs', {
      food: foodToEdit,
    });
  } catch (error) {
    console.log(error); 
    res.redirect('/');
  }
});

// GET /users/:userID/foods/new
router.get("/new", async (req, res) => {
  res.render("foods/new.ejs");
});

// PUT /users/:userId/foods/:foodId
router.put('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const foodToUpdate = currentUser.pantry.id(req.params.foodId);
    
    foodToUpdate.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error)
    res.redirect('/');
  }
});


// DELETE /users/:userId/foods/foodsId
router.delete("/:foodId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const foodItemToDelete = currentUser.pantry.id(req.params.foodId);
    foodItemToDelete.deleteOne();
    await currentUser.save();
    
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// GET /users/:userID/foods <- already here
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("foods/index.ejs", {
      pantry: currentUser.pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// POST /users/:userId/foods
router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push({ name: req.body.name });
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});


module.exports = router;
