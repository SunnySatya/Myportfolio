const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin-controller");

// Admin routes (protected by requireAdmin middleware)
router.get(
  "/users",
  adminControllers.requireAdmin,
  adminControllers.getAllUsers,
);
router.get(
  "/contacts",
  adminControllers.requireAdmin,
  adminControllers.getAllContacts,
);
router.get(
  "/stats",
  adminControllers.requireAdmin,
  adminControllers.getDashboardStats,
);

module.exports = router;
