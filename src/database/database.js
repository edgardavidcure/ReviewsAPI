const mongoose = require("mongoose");
const config = require("../config/index.config");
const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(config.databaseURL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
