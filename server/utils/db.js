const mongoose = require("mongoose");

// dotenv is loaded by server.js, but we load it here too for safety
try {
  require("dotenv").config({ path: __dirname + "/../.env" });
} catch (e) {
  // dotenv might not be installed, skip
}

const URI = process.env.MONGO_URI;
const hasPlaceholder = /<[^>]+>/.test(URI || "");

if (!URI || hasPlaceholder) {
  throw new Error(
    "MONGO_URI is missing or still contains placeholder values. Check your .env file.",
  );
}

const connectDb = async () => {
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
