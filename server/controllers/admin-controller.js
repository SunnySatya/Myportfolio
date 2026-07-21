const User = require("../models/user-models");
const Contact = require("../models/contact-models");

// Middleware to check if user is admin (via x-user-email header for GET requests)
const requireAdmin = async (req, res, next) => {
  try {
    const email = req.headers["x-user-email"];

    if (!email) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    req.adminUser = user;
    next();
  } catch (error) {
    console.error("Admin middleware error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/admin/users — Fetch all registered users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Failed to fetch users:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// GET /api/admin/contacts — Fetch all contact submissions
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error("Failed to fetch contacts:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
      error: error.message,
    });
  }
};

// GET /api/admin/stats — Dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const totalAdmins = await User.countDocuments({ isAdmin: true });
    const recentUsers = await User.find({}, { password: 0 })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalContacts,
        totalAdmins,
        recentUsers,
      },
    });
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  getDashboardStats,
  requireAdmin,
};
