const PharmacyRecord = require('../models/PharmacyRecord');

const RECORD_FIELDS = [
  'NameOfTablets',
  'Ref',
  'Dose',
  'NoOfTablets',
  'Lot',
  'IssueDate',
  'ExpDate',
  'DailyDose',
  'Storage_Advice',
  'NHSNumber',
  'PatientName',
  'DOB',
  'BloodPressure',
  'Medication',
  'PatientId',
  'FurtherInformation',
  'SideEffect',
  'Address'
];

const pickRecordFields = (body) => {
  return RECORD_FIELDS.reduce((record, field) => {
    if (body[field] !== undefined) {
      record[field] = body[field];
    }
    return record;
  }, {});
};

exports.getRecords = async (req, res) => {
  try {
    const records = await PharmacyRecord.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRecord = async (req, res) => {
  try {
    const data = pickRecordFields(req.body);

    if (!data.Ref || !String(data.Ref).trim()) {
      return res.status(400).json({ message: 'Reference No is required' });
    }

    const existing = await PharmacyRecord.findOne({ Ref: data.Ref.trim() });
    if (existing) {
      return res.status(400).json({ message: 'Reference No already exists' });
    }

    const record = await PharmacyRecord.create(data);
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const record = await PharmacyRecord.findOne({ Ref: req.params.ref });

    if (!record) {
      return res.status(404).json({ message: 'Record with given Reference No not found' });
    }

    const data = pickRecordFields(req.body);
    delete data.Ref;

    record.set(data);
    await record.save();

    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const record = await PharmacyRecord.findOneAndDelete({ Ref: req.params.ref });

    if (!record) {
      return res.status(404).json({ message: 'Record with given Reference No not found' });
    }

    res.json({ message: 'Patient record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
