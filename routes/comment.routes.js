const router = require("express").Router();
const Comment = require("../models/Comment.model");
const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");

// "/comments/all"
router.get("/all/:id", (req, res, next) => {
    const { id } =  req.params;
    Comment.find({ commentingOn: id }).populate('createdBy')
     // find those which are commentingOn the recipe id in the current params/ URL 
      .then((data) => res.json(data))
      .catch((err) => next(err));
  });


// "/comments/create"
router.post("/create/:id", (req, res, next) => {
    const { id } = req.params;
    const { input } = req.body; // also add the avatar
    Comment.create({ commentingOn: id, input, createdBy: req.session.user._id})
      .then((data) => res.json(data))
      .catch((err) => next(err));
  }); 

// comments/edit/:id
router.get("/edit/:id", (req, res, next) => {
  Comment.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}); // on view Howdiy.jsx

// comments/delete/:id
router.delete("/delete/:id", (req, res, next) => {
  Comment.findByIdAndDelete(req.params.id)
    .then((data) =>
      res.json("Your changes are made...we got rid of..." + data._id)
    )
    .catch((err) => next(err));
});


module.exports = router;
