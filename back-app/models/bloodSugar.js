const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const glucoseSchema = new Schema({
  date: { type: Date },
  glucose_level: { type: Number, required: true },
  userId: { type: String, required: true}
});

const Glucose = mongoose.model("Glucose", glucoseSchema);

module.exports = Glucose;