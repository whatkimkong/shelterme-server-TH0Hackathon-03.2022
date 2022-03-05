const router = require("express").Router();
const fileUploader = require("../middlewares/cloudinary.config")

router.post('/', fileUploader.single('imageUrl'), (req, res, next) => {
    if (!req.file) {
      next(new Error('No file upload!'));
      return;
    }
    res.json({ imagePath: req.file.path });
  });

module.exports=router;