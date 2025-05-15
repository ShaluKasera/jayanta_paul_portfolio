const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../config/cloudinaryConfig");
const { handleAddResume, handleGetResume } = require("../controllers/resumeController");

router.post(
  "/add-resume",
  auth,
  upload.single("resume"),               
  handleAddResume               
);

router.get("/", handleGetResume);

module.exports = router;
