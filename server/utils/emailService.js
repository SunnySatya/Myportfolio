const nodemailer = require("nodemailer");

// Create transporter using Gmail SMTP (or any SMTP service)
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.warn(
      "⚠️ EMAIL_USER or EMAIL_PASS not set in .env. Email notifications disabled.",
    );
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

/**
 * Send a notification email when a user registers
 */
const sendRegistrationNotification = async (user) => {
  try {
    const transporter = createTransporter();
    if (!transporter) return;

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    if (!adminEmail) {
      console.warn("⚠️ No admin email configured for notifications.");
      return;
    }

    const mailOptions = {
      from: `"Portfolio Site" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: "🔔 New User Registration!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="text-align: center; background: linear-gradient(135deg, #0ea5e9, #6366f1); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🎉 New User Registered!</h1>
          </div>
          <div style="padding: 20px; background: #f9fafb;">
            <p style="font-size: 16px; color: #333;">A new user has registered on your portfolio site:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555; width: 120px;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; color: #333;">${user.username}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; color: #333;">${user.email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; color: #333;">${user.phone || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #555;">Time:</td>
                <td style="padding: 10px; color: #333;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
              </tr>
            </table>
            <p style="margin-top: 20px; font-size: 14px; color: #888; text-align: center;">
              You can manage users from the <a href="http://localhost:5173/admin" style="color: #0ea5e9;">Admin Dashboard</a>.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(
      `✅ Registration notification email sent to admin (${adminEmail})`,
    );
  } catch (error) {
    console.error(
      "❌ Failed to send registration notification email:",
      error.message,
    );
  }
};

/**
 * Send a notification email when a user logs in
 */
const sendLoginNotification = async (user) => {
  try {
    const transporter = createTransporter();
    if (!transporter) return;

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    if (!adminEmail) {
      console.warn("⚠️ No admin email configured for notifications.");
      return;
    }

    const mailOptions = {
      from: `"Portfolio Site" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: "🔑 User Login Alert!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="text-align: center; background: linear-gradient(135deg, #f59e0b, #ef4444); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🔑 User Login Alert</h1>
          </div>
          <div style="padding: 20px; background: #f9fafb;">
            <p style="font-size: 16px; color: #333;">A user just logged in to your portfolio site:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555; width: 120px;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; color: #333;">${user.username}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; color: #333;">${user.email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #555;">Time:</td>
                <td style="padding: 10px; color: #333;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Login notification email sent to admin (${adminEmail})`);
  } catch (error) {
    console.error("❌ Failed to send login notification email:", error.message);
  }
};

module.exports = { sendRegistrationNotification, sendLoginNotification };
