const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb://${process.env.DB_DOMAIN}:${process.env.DB_PORT}/bytebuy`
    );
    console.log("✅ Cart servie connected to DB");
  } catch (error) {
    console.log("❌", error);
  }
}

module.exports = connectDB;
