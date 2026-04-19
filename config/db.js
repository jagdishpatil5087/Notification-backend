// ✅ Import mongoose
const mongoose = require("mongoose");

// ✅ Connect function
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/myapp");

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("DB Error ❌", error);
    process.exit(1);
  }
};

module.exports = connectDB;
