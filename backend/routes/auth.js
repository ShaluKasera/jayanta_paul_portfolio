const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updateProfile,
} = require("../controllers/auth");
const upload = require("../config/cloudinaryConfig");

router.post("/signup", upload.single("profileImageURL"), signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/update-profile/:id",auth,upload.single("profileImageURL"),updateProfile)

module.exports = router;
