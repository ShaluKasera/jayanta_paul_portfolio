const { transporter } = require("../config/nodemailerConfig");

const sendResetPasswordEmail = async (email, resetUrl) => {
  try {
    const response = await transporter.sendMail({
      from: '"Portfolio Web Support" <shalukumari93129@gmail.com>',
      to: email,
      subject: "Your Password Reset Request",
      text: `You requested a password reset. Click this link to continue: ${resetUrl}`, 
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="text-align: center; color: #333;">Password Reset Request</h2>
          <p style="font-size: 16px; color: #444; text-align: center;">
            We received a request to reset your password. Please click the button below to set a new password.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #007bff; color: #ffffff; padding: 12px 24px; font-size: 16px; text-decoration: none; border-radius: 8px; display: inline-block;">
              Reset Your Password
            </a>
          </div>
          
          <p style="font-size: 14px; color: #666; text-align: center;">
            This link is valid for 10 minutes. If you didn’t request this, please ignore this email.
          </p>
          <div style="text-align: center; color: #aaa; font-size: 12px; margin-top: 20px;">
            © 2025 Icche Web Support. All rights reserved.
          </div>
        </div>
      `,
    });

    console.log("Password reset email sent successfully:", response);
    return true; // Indicate success
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return false; // Indicate failure
  }
};
// Utility to generate 4-digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

module.exports = {
  sendResetPasswordEmail,
  generateOTP,
};
