const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const glucoseController = require('../controller/glucoseController');

router.post('/', auth.verifyToken,glucoseController.createGlucoseRecord);
router.get('/', auth.verifyToken,glucoseController.getGlucoseRecords);
router.put('/:id', auth.verifyToken, glucoseController.updateGlucoseRecord);
router.delete('/:id', auth.verifyToken, glucoseController.deleteGlucoseRecord);
router.get('/year/:year', auth.verifyToken,glucoseController.filterGlucoseRecordsByYear);

module.exports = router;