const Contact = require("../models/contact-models");

const contact = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    if (!username || !email || !message) {
      return res.status(400).json({
        message: "All fields (username, email, message) are required",
        success: false,
      });
    }

    const newContact = await Contact.create({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    console.log("New contact form submission:", {
      username: newContact.username,
      email: newContact.email,
      message: newContact.message,
      timestamp: newContact.createdAt,
    });

    return res.status(201).json({
      message: "Your message has been sent successfully!",
      success: true,
      contact: newContact,
    });
  } catch (error) {
    console.error("Contact form submission failed:", error.message);
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { contact };
