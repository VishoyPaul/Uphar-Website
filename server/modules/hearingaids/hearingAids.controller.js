import HearingAid from '../models/HearingAid.js';

// Get all hearing aids
export const getAllHearingAids = async (req, res) => {
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
export const getHearingAidById = async (req, res) => {
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
export const createHearingAid = async (req, res) => {
  try {
    const hearingAid = await HearingAid.create(req.body);

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
export const updateHearingAid = async (req, res) => {
  try {
    const hearingAid = await HearingAid.findByIdAndUpdate(
      req.params.id,
      req.body,
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
export const deleteHearingAid = async (req, res) => {
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