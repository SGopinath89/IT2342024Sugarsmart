const mongoose = require('mongoose');

  exports.connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connection Established...");
    } catch (error) {
      console.error(error.message);
    }
  }