const bcrypt = require("bcryptjs");
const User = require("../models/user-models");
const {
  sendRegistrationNotification,
  sendLoginNotification,
} = require("../utils/emailService");

const home = async (req, res) => {
  res.status(200).send("Welcome to the home page");
};

const register = async (req, res) => {
  try {
    const body = req.body || {};
    const username = body.username?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim();
    const password = body.password?.trim();

    if (!username || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required",
        received: body,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });
    const userResponse = user.toObject();
    delete userResponse.password;

    // Send notification email to admin (non-blocking)
    sendRegistrationNotification({ username, email, phone });

    return res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Registration failed:", error.message);
    console.error("Full error:", error);
    return res.status(500).json({
      message: "Registration failed. Please try again.",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    // Send notification email to admin (non-blocking)
    sendLoginNotification({ username: user.username, email: user.email });

    return res.status(200).json({
      message: "Login successful",
      user: userResponse,
    });
  } catch (error) {
    console.error("Login failed:", error.message);
    return res.status(500).json({
      message: "Login failed. Please try again.",
      error: error.message,
    });
  }
};

module.exports = { home, register, login };
