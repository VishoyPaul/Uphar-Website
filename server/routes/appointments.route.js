const express = require('express');
const { verifyAccessToken } = require('../middleware/verifyToken');
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

router.get('/', verifyAccessToken, getAllAppointments);
router.get('/my', getMyAppointments);
router.get('/date/:date', verifyAccessToken, getAppointmentsByDate);
router.get('/status/:status', verifyAccessToken, getAppointmentsByStatus);
router.get('/:id', verifyAccessToken, getAppointmentById);
router.post('/', createAppointment);
router.put('/:id', verifyAccessToken, updateAppointment);
router.delete('/:id', verifyAccessToken, deleteAppointment);

module.exports = router;
