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


//delete


//filter by year
exports.filterGlucoseRecordsByYear = async (req, res) => {
  try {
      const { year } = req.params;
      const records = await Glucose.aggregate([
          {
              $match: {
                  user: req.user.id,
                  date: { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year}-12-31`) }
              }
          },
          {
              $group: {
                  _id: { $month: "$date" },
                  averageLevel: { $avg: "$glucose_level" }
              }
          }
      ]);
      res.json(records);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
};