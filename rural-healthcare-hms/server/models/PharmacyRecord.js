const mongoose = require('mongoose');

const pharmacyRecordSchema = new mongoose.Schema({
  NameOfTablets: { type: String },
  Ref: { type: String, required: true, unique: true, trim: true },
  Dose: { type: String },
  NoOfTablets: { type: String },
  Lot: { type: String },
  IssueDate: { type: String },
  ExpDate: { type: String },
  DailyDose: { type: String },
  Storage_Advice: { type: String },
  NHSNumber: { type: String },
  PatientName: { type: String },
  DOB: { type: String },
  BloodPressure: { type: String },
  Medication: { type: String },
  PatientId: { type: String },
  FurtherInformation: { type: String },
  SideEffect: { type: String },
  Address: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PharmacyRecord', pharmacyRecordSchema);
