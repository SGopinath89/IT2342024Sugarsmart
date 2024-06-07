const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const glucoseController = require('../controller/glucoseController');

router.post('/', glucoseController.createGlucoseRecord);
router.get('/', glucoseController.getGlucoseRecords);
//router.put('/:id', glucoseController.updateGlucoseRecord);
//router.delete('/:id',glucoseController.deleteGlucoseRecord);
router.get('/year/:year', glucoseController.filterGlucoseRecordsByYear);

module.exports = router;