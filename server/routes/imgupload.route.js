const express = require('express');
const upload = require('../imguplaod/middleware/image.uploader');
const { uploadImage } = require('../imguplaod/controller/img.upload.controller');

const router = express.Router();

router.post('/', (req, res, next) => {
  upload.single('image')(req, res, (error) => {
    if (error) {
      console.error('Image upload middleware error:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Image upload failed',
      });
    }
    return next();
  });
}, uploadImage);

module.exports = router;
