const express = require('express');
const router = express.Router();
const { 
  createPatientProfile, 
  bookAppointment, 
  getTodayQueue 
} = require('../controllers/patientController');

router.post('/register-patient', createPatientProfile);
router.post('/book-opd', bookAppointment);
router.get('/opd-queue', getTodayQueue);

module.exports = router;