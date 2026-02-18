const express = require('express');
const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDate,
  getAppointmentsByStatus,
  getMyAppointments,
} = require('../modules/hearingaids/connectform.controller');

const router = express.Router();

router.get('/', getAllAppointments);
router.get('/my', getMyAppointments);
router.get('/date/:date', getAppointmentsByDate);
router.get('/status/:status', getAppointmentsByStatus);
router.get('/:id', getAppointmentById);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

module.exports = router;
