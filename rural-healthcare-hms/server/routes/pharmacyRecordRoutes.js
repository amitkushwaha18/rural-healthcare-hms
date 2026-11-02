const express = require('express');
const router = express.Router();
const {
  getRecords,
  createRecord,
  updateRecord,
  deleteRecord
} = require('../controllers/pharmacyRecordController');

router.get('/', getRecords);
router.post('/', createRecord);
router.put('/:ref', updateRecord);
router.delete('/:ref', deleteRecord);

module.exports = router;
