const router = require("express").Router();
const authRoutes = require("./auth.routes");
const profileRoutes = require("./profile.routes"); // added for profile page
const { isLoggedIn } = require("../middlewares/authorization"); // middlewares
const recipeRoutes = require("./recipe.routes"); // added for recipes
const commentRoutes = require("./comment.routes");
const cloudinaryRoutes = require("./cloudinaryRoutes");


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/join", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
router.use("/auth", authRoutes);
router.use("/profile", isLoggedIn, profileRoutes); // added for profile page
router.use("/recipes", isLoggedIn, recipeRoutes); 
router.use("/comments", isLoggedIn, commentRoutes)

router.use("/upload", cloudinaryRoutes)

// example: router.use("/auth", authRoutes)
module.exports = router;
