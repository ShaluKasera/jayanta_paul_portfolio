// controllers/personalInfoController.js
const PersonalInfo = require("../models/personalInfo");

// Create new personal info
const createPersonalInfo = async (req, res) => {
  try {
    const { title, item } = req.body;
    if (!title || !item) {
      return res.status(400).json({ message: "Both title and item are required." });
    }
    const personalInfo = new PersonalInfo({ title, item });
    await personalInfo.save();
    res.status(201).json({ message: "Personal info created", personalInfo });
  } catch (err) {
    console.error("Create PersonalInfo Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all personal info
const getAllPersonalInfo = async (req, res) => {
  try {
    const personalInfoList = await PersonalInfo.find().sort({ createdAt: -1 });
    res.status(200).json({ personalInfo: personalInfoList });
  } catch (err) {
    console.error("Get All PersonalInfo Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update personal info by ID
const updatePersonalInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.item !== undefined) updates.item = req.body.item;

    const personalInfo = await PersonalInfo.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!personalInfo) {
      return res.status(404).json({ message: "Personal info not found" });
    }
    res.status(200).json({ message: "Personal info updated", personalInfo });
  } catch (err) {
    console.error("Update PersonalInfo Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete personal info by ID
const deletePersonalInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const personalInfo = await PersonalInfo.findByIdAndDelete(id);
    if (!personalInfo) {
      return res.status(404).json({ message: "Personal info not found" });
    }
    res.status(200).json({ message: "Personal info deleted" });
  } catch (err) {
    console.error("Delete PersonalInfo Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createPersonalInfo,
  getAllPersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo,
};
