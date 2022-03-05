const router = require("express").Router();
const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model"); // use this PENDING -- find the User (createdBy) of the Recipe
const fileUploader = require("../middlewares/cloudinary.config");

// "/recipes/categories"
router.get("/categorylist/:category", (req, res, next) => {
  const { category } = req.params;
  Recipe.find(
    { category },
    {
      productImg: 1,
      funName: 1,
      descriptiveName: 1,
      difficultyRating: 1,
      timeOfPreparation: 1,
      costRating: 1,
      createdBy: 1,
      ingredients: 1,
    }
  )
    .populate("createdBy")
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

//create  // "/recipes/create"
router.post("/create", (req, res, next) => {
  const {
    category,
    descriptiveName,
    ingredients,
    productImg,
    gallery,
    preparation,
    isGiftable,
    timeOfPreparation,
    costRating,
    difficultyRating,
    funName,
  } = req.body;
  Recipe.create({
    category,
    funName,
    descriptiveName,
    ingredients,
    preparation,
    productImg,
    isGiftable,
    gallery,
    timeOfPreparation,
    costRating,
    difficultyRating,
    createdBy: req.session.user._id,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// VIEW / display a specific howdiy with all info
router.get("/howdiy/:id", (req, res, next) => {
  Recipe.findById(req.params.id)
    .populate("createdBy")
    .then((data) => res.json(data))
    .catch((err) => next(err));
}); // for the view of Howdiy.jsx

// inside VIEW - recipes/:id/addIngredient
router.post("/:id/addIngredient", (req, res, next) => {
  const { category, name, quantity, measure } = req.body;

  Recipe.findByIdAndUpdate(
    req.params.id,
    { $push: { ingredients: { name, quantity, measure } } },
    { new: true }
  )
    .then((data) => {
      // push into the array above with the $push ingredients: {}
      res.status(200).json(data);
    })
    .catch((err) => next(err));
});

// recipes/addIngredient/delete/:id
router.delete("/ingredients/delete/:id", (req, res, next) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then((data) =>
      res.json("Your changes are made...we got rid of..." + data._id)
    )
    .catch((err) => next(err));
});

// recipes/addIngredient/delete/:id
router.delete("/preparation/delete/:id", (req, res, next) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then((data) =>
      res.json("Your changes are made...we got rid of..." + data._id)
    )
    .catch((err) => next(err));
});

//get the info for the edit page
router.get("/edit/:id", (req, res, next) => {
  Recipe.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}); // for the view of Howdiy.jsx

//edit  /recipes/edit/:id
router.patch("/edit/:id", (req, res, next) => {
  const {
    category,
    descriptiveName,
    ingredients,
    preparation,
    productImg,
    isGiftable,
    gallery,
    timeOfPreparation,
    costRating,
    difficultyRating,
  } = req.body;
  Recipe.findByIdAndUpdate(
    req.params.id,
    {
      category,
      descriptiveName,
      ingredients,
      preparation,
      productImg,
      isGiftable,
      gallery,
      timeOfPreparation,
      costRating,
      difficultyRating,
    },
    { new: true }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

//delete
router.delete("/delete/:id", (req, res, next) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then((data) =>
      res.json("Your changes are made...we got rid of..." + data._id)
    )
    .catch((err) => next(err));
});

module.exports = router;
