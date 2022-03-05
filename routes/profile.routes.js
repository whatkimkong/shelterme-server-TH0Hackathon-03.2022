const router = require("express").Router();
const Recipe = require("../models/Recipe.model");

router.get("/recipes", (req, res, next) => { // what do we want on here? Recipe
  Recipe.find({createdBy: req.session.user._id})
  .then((data) => res.status(200).json(data)) // means success
  .catch((err) => next(err));
});

module.exports = router;






/* 
>>>>>> TO DO LATER User.find? Do we really need?
router.get("/", (req, res, next) => { // what do we want on here? User
  const profileData = { message: "this is secure information" }; // User.findOne - try to find the user currently logged in
  res.status(200).json(profileData); // means success
}); // but the session knows what user is logged in so why User.find????


session will be outdated if the user changes their info
if they change their username for example 

if you want to edit info THEN IS BETTER to have a proper route to profile
updating the session --> how to? we havent done yet 
*/