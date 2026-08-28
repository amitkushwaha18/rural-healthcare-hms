const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

// Register Patient / ABHA Profile
exports.createPatientProfile = async (req, res) => {
  try {
    const { abhaId, age, gender, address, medicalHistory } = req.body;

    let patient = await Patient.findOne({ abhaId });
    if (patient && abhaId) {
      return res.status(400).json({ message: 'Patient with this ABHA ID already exists' });
    }

    patient = new Patient({
      user: req.user ? req.user.id : null,
      abhaId,
      age,
      gender,
      address,
      medicalHistory,
      isOfflineSynced: req.body.isOfflineSynced || false
    });

    await patient.save();
    res.status(201).json({ message: 'Patient profile created successfully', patient });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Book OPD Token / Appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, symptoms, phcLocation } = req.body;

    // Generate Token Number for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const count = await Appointment.countDocuments({ createdAt: { $gte: today } });
    const tokenNumber = count + 1;

    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId || null,
      symptoms,
      tokenNumber,
      phcLocation
    });

    await appointment.save();
    res.status(201).json({ message: 'OPD Token generated', appointment, tokenNumber });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Today's Queue Status
exports.getTodayQueue = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const queue = await Appointment.find({ createdAt: { $gte: today } })
      .populate('patient')
      .populate('doctor', 'name');

    res.json(queue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};