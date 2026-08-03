const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/expolearngraphql", {
      serverSelectionTimeoutMS: 5000
    });

    console.log("✅ Database connected");
  } catch (error) {
    console.log("❌ DB Error:", error.message);
    throw error; // ⚠️ important
  }
};

module.exports = connectDB;