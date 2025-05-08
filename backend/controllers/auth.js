const User = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,20}$/;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "24h";  


const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 6–20 chars long, include 1 uppercase, 1 lowercase, and 1 special character.",
      });
    }


    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({ message: "Signup successful", user: { id: user._id, name, email } });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ====== LOGIN ======
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Create JWT payload
    const payload = { id: user._id, name: user.name, email: user.email };

    // Sign token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
      message: "Login successful",
      token,
      user: payload,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ====== FORGOT PASSWORD ======
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    res.status(200).json({ message: "User exists. You may now reset your password." });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ====== RESET PASSWORD ======
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be 6–20 chars long, include 1 uppercase, 1 lowercase, and 1 special character.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    // Hash & update
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
};
