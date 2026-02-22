const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select an image file.'
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: req.file.path
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  uploadImage
};
