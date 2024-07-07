const Glucose = require('../models/bloodSugar');

//create record
exports.createGlucoseRecord = async (req, res) => {
  try {
      const { date, glucose_level } = req.body;
      const newRecord = new Glucose({ date, glucose_level, user: req.user.id });
      await newRecord.save();
      res.json(newRecord);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
};

//get all glucose level records
exports.getGlucoseRecords = async (req, res) => {
  try {
      const records = await Glucose.find({ user: req.user.id });
      res.json(records);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
};

//update 
exports.updateGlucoseRecord = async (req, res) => {
    try {
      const { id } = req.params;
      const { date, glucose_level } = req.body;
  
      // Find the record by ID and update it
      const updatedRecord = await Glucose.findByIdAndUpdate(
        id,
        { date, glucose_level },
        { new: true } // To return the updated document
      );
  
      if (!updatedRecord) {
        return res.status(404).json({ msg: 'Glucose record not found' });
      }
  
      res.json(updatedRecord);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };

//delete
exports.deleteGlucoseRecord = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the record by ID and delete it
      const deletedRecord = await Glucose.findByIdAndDelete(id);
  
      if (!deletedRecord) {
        return res.status(404).json({ msg: 'Glucose record not found' });
      }
  
      res.json({ msg: 'Glucose record deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };

//filter by year
exports.filterGlucoseRecordsByYear = async (req, res) => {
  try {
      const { year } = req.params;
      const startDate = new Date(`${year}-01-01T00:00:00Z`);
      const endDate = new Date(`${year}-12-31T23:59:59Z`);
      const records = await Glucose.find({
        user: req.user.id,
        date: { $gte: startDate, $lt: endDate }
      });
      console.log(`Records found: ${records.length}`);
      res.json(records);
  } catch (error) {
      console.error(error.message);
      res.status(500).json('Server Error');
  }
};