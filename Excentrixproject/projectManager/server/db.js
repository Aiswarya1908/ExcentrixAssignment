const mongoose = require("mongoose");

module.exports = () => {
  try {
    console.log(process.env.DB_URI);
    mongoose.connect(process.env.DB_URI, {});
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("Could not connect database!");
  }
};

mongoose.set("strictQuery", false);
