const express = require("express");
const router = express.Router();
const contactControllers = require("../controllers/contact-controller");

router.post("/", contactControllers.contact);

module.exports = router;
