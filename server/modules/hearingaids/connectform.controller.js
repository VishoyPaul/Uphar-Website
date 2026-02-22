const Appointment = require('./connectform.model.js');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private/Admin
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
const createAppointment = async (req, res) => {
  try {
    const {
      serviceType,
      fullName,
      phone,
      email,
      age,
      preferredDate,
      timeSlot,
      visitType,
      streetAddress,
      city,
      state,
      pinCode,
      landmark,
      reasonForVisit,
      hearingIssues,
      additionalNotes,
      agreeToTerms,
      sendReminders
    } = req.body;

    // Create appointment object
    const appointmentData = {
      serviceType,
      fullName,
      phone,
      email,
      age,
      preferredDate,
      timeSlot,
      visitType,
      reasonForVisit,
      hearingIssues,
      additionalNotes,
      agreeToTerms,
      sendReminders
    };

    // Add address if home visit
    if (visitType === 'home-visit') {
      appointmentData.address = {
        street: streetAddress,
        city,
        state,
        pinCode,
        landmark
      };
    }

    const appointment = await Appointment.create(appointmentData);

    // TODO: Send confirmation email/SMS here
    // sendConfirmationEmail(appointment);

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private/Admin
const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private/Admin
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      message: 'Appointment cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get appointments by date
// @route   GET /api/appointments/date/:date
// @access  Private/Admin
const getAppointmentsByDate = async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    const appointments = await Appointment.find({
      preferredDate: {
        $gte: date,
        $lt: nextDay
      }
    });

    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get appointments by status
// @route   GET /api/appointments/status/:status
// @access  Private/Admin
const getAppointmentsByStatus = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      status: req.params.status
    }).sort({ preferredDate: 1 });

    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get appointments for a client by email + phone
// @route   GET /api/appointments/my?email=...&phone=...
// @access  Public
const getMyAppointments = async (req, res) => {
  try {
    const email = String(req.query.email || '').trim().toLowerCase();
    const phone = String(req.query.phone || '').trim();

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Email and phone are required'
      });
    }

    const appointments = await Appointment.find({
      email,
      phone
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDate,
  getAppointmentsByStatus,
  getMyAppointments,
};
