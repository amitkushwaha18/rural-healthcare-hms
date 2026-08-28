const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  abhaId: { type: String, unique: true, sparse: true }, // Rural ABHA ID
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  address: {
    village: String,
    district: String,
    state: String
  },
  medicalHistory: [String],
  isOfflineSynced: { type: Boolean, default: false } // SIH Offline-first flag
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);