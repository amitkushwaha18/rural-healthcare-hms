const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 1. Fetch All Records (fetch_data)
router.get('/all', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM hospital');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Insert Record (iPrescriptionData)
router.post('/add', async (req, res) => {
  const {
    NameOfTablets, Ref, Dose, NoOfTablets, Lot, IssueDate, ExpDate,
    DailyDose, Storage_Advice, NHSNumber, PatientName, DOB,
    BloodPressure, Medication, PatientId, FurtherInformation, SideEffect, Address
  } = req.body;

  try {
    const query = `INSERT INTO hospital VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    await db.query(query, [
      NameOfTablets, Ref, Dose, NoOfTablets, Lot, IssueDate, ExpDate,
      DailyDose, Storage_Advice, NHSNumber, PatientName, DOB,
      BloodPressure, Medication, PatientId, FurtherInformation, SideEffect, Address
    ]);
    res.json({ message: 'Data Inserted Successfully into MySQL' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Update Record (update_data)
router.put('/update/:ref', async (req, res) => {
  const {
    NameOfTablets, Dose, NoOfTablets, Lot, IssueDate, ExpDate,
    DailyDose, Storage_Advice, NHSNumber, PatientName, DOB,
    BloodPressure, Medication, PatientId, FurtherInformation, SideEffect, Address
  } = req.body;

  try {
    const query = `
      UPDATE hospital SET
      NameOfTablets=?, Dose=?, NoOfTablets=?, Lot=?, IssueDate=?, ExpDate=?,
      DailyDose=?, Storage_Advice=?, NHSNumber=?, PatientName=?, DOB=?,
      BloodPressure=?, Medication=?, PatientId=?, FurtherInformation=?,
      SideEffect=?, Address=? WHERE Reference_No=?
    `;
    await db.query(query, [
      NameOfTablets, Dose, NoOfTablets, Lot, IssueDate, ExpDate,
      DailyDose, Storage_Advice, NHSNumber, PatientName, DOB,
      BloodPressure, Medication, PatientId, FurtherInformation, SideEffect, Address,
      req.params.ref
    ]);
    res.json({ message: 'Record Updated Successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Delete Record (idelete)
router.delete('/delete/:ref', async (req, res) => {
  try {
    await db.query('DELETE FROM hospital WHERE Reference_No=?', [req.params.ref]);
    res.json({ message: 'Patient record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;