const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tokenNumber: { type: Number, required: true },
  symptoms: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Waiting', 'In-Consultation', 'Completed', 'Cancelled'], 
    default: 'Waiting' 
  },
  phcLocation: { type: String, default: 'Primary Health Center' },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);