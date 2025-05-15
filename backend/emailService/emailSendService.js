const { transporter } = require("../config/nodemailerConfig");

const sendOTPEmail = async (email, otp) => {
  try {
    const response = await transporter.sendMail({
      from: '"Portfolio Web Support" <shalukumari93129@gmail.com>',
      to: email,
      subject: "Your OTP to Change Password",
      text: `This is your OTP to change your password: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="text-align: center; color: #333;">Password Change OTP</h2>
          <p style="font-size: 16px; color: #444; text-align: center;">
            This is Iccheyour OTP to change your password:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <div style="display: inline-block; background: #e2e2e2; padding: 12px 24px; font-size: 24px; border-radius: 8px; letter-spacing: 2px;">
              ${otp}
            </div>
          </div>
          <p style="font-size: 14px; color: #666; text-align: center;">
            The OTP is valid for 10 minutes. If you didn’t request this, please ignore this email.
          </p>
          <div style="text-align: center; color: #aaa; font-size: 12px; margin-top: 20px;">
            © 2025 Icche Web Support. All rights reserved.
          </div>
        </div>
      `,
    });

    console.log("OTP email sent successfully:", response);
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};

// Utility to generate 4-digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

module.exports = {
  sendOTPEmail,
  generateOTP,
};
