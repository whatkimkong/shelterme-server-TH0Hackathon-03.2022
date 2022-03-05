 // config/cloudinary.config.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  // cloudinary: cloudinary,
  cloudinary,
  allowed_formats: ['jpg', 'png'],
  folder: 'red-leather-lab-ltd' // The name of the folder in cloudinary
    // resource_type: 'raw' => this is in case you want to upload other type of files, not just images
});

// storage: storage
module.exports = multer({ storage });




/* 


const express = require('express');
const app = express;

const upload = multer({
  storage: storage,
});

const parser = multer({ storage: storage });

app.post('/upload', parser.single('imageUrl'), function (req, res) {
  res.json(req.file);
});


module.exports = multer({ storage, upload });

*/