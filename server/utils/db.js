const mongoose = require("mongoose");

// dotenv is loaded by server.js, but we load it here too for safety
try {
  require("dotenv").config({ path: __dirname + "/../.env" });
} catch (e) {
  // dotenv might not be installed, skip
}

const URI = process.env.MONGO_URI;

const connectDb = async () => {
  if (!URI) {
    console.warn("MONGO_URI is not set. Skipping database connection.");
    return;
  }

  try {
    await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 20000,
    });
    console.log("database connection successful");
  } catch (error) {
    console.error("database connection failed:", error.message || error);
    throw error;
  }
};

module.exports = connectDb;
