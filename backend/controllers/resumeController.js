const Resume = require('../models/resumeModel');

const handleAddResume = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    const resumeUrl = req.file.path; // Cloudinary returns the URL here
    const newResume = await Resume.create({ resume: resumeUrl });

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume: newResume.resume,
    });
  } catch (error) {
    console.error("Add resume error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const handleGetResume = async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 }); 
    if (!resume) {
      return res.status(404).json({ message: "No resume found" });
    }
    res.status(200).json({ resume: resume.resume });
  } catch (error) {
    console.error("Get resume error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
    handleAddResume,
    handleGetResume
}