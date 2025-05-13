const Education = require("../models/education");

// Create a new education entry
const createEducation = async (req, res) => {
  try {
    const { year, text } = req.body;
    if (!year || !text) {
      return res.status(400).json({ message: "Both year and text are required." });
    }

    const education = new Education({ year, text });
    await education.save();
    res.status(201).json({ message: "Education created", education });
  } catch (err) {
    console.error("Create Education Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all education records
const getAllEducations = async (req, res) => {
  try {
    const educations = await Education.find().sort({ year: -1 });
    res.status(200).json({ educations });
  } catch (err) {
    console.error("Get All Educations Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an education by ID
const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, text } = req.body;

    const updates = {};
    if (year !== undefined) updates.year = year;
    if (text !== undefined) updates.text = text;

    const education = await Education.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    res.status(200).json({ message: "Education updated", education });
  } catch (err) {
    console.error("Update Education Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an education by ID
const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await Education.findByIdAndDelete(id);
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    res.status(200).json({ message: "Education deleted" });
  } catch (err) {
    console.error("Delete Education Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createEducation,
  getAllEducations,
  updateEducation,
  deleteEducation,
};
