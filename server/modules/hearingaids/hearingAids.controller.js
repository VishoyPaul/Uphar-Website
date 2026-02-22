const HearingAid = require('./product.model.js');

// Get all hearing aids
const getAllHearingAids = async (req, res) => {
  try {
    const hearingAids = await HearingAid.find();
    res.json({
      success: true,
      data: hearingAids
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single hearing aid
const getHearingAidById = async (req, res) => {
  try {
    const hearingAid = await HearingAid.findById(req.params.id);
    
    if (!hearingAid) {
      return res.status(404).json({
        success: false,
        message: 'Hearing aid not found'
      });
    }

    res.json({
      success: true,
      data: hearingAid
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create hearing aid
const createHearingAid = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : req.body.image;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Image is required. Please upload an image file.'
      });
    }

    const hearingAidData = {
      brand: req.body.brand,
      model: req.body.model,
      color: req.body.color,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      image: imageUrl,
      description: req.body.description
    };

    const hearingAid = await HearingAid.create(hearingAidData);

    res.status(201).json({
      success: true,
      message: 'Hearing aid created successfully',
      data: hearingAid
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update hearing aid
const updateHearingAid = async (req, res) => {
  try {
    const updateData = {};

    if (req.body.brand !== undefined) updateData.brand = req.body.brand;
    if (req.body.model !== undefined) updateData.model = req.body.model;
    if (req.body.color !== undefined) updateData.color = req.body.color;
    if (req.body.price !== undefined) updateData.price = Number(req.body.price);
    if (req.body.stock !== undefined) updateData.stock = Number(req.body.stock);
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.file) updateData.image = req.file.path;
    if (req.body.image && !req.file) updateData.image = req.body.image;

    const hearingAid = await HearingAid.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!hearingAid) {
      return res.status(404).json({
        success: false,
        message: 'Hearing aid not found'
      });
    }

    res.json({
      success: true,
      message: 'Hearing aid updated successfully',
      data: hearingAid
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete hearing aid
const deleteHearingAid = async (req, res) => {
  try {
    const hearingAid = await HearingAid.findByIdAndDelete(req.params.id);

    if (!hearingAid) {
      return res.status(404).json({
        success: false,
        message: 'Hearing aid not found'
      });
    }

    res.json({
      success: true,
      message: 'Hearing aid deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllHearingAids,
  getHearingAidById,
  createHearingAid,
  updateHearingAid,
  deleteHearingAid,
};
