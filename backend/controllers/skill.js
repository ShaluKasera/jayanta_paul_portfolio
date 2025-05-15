// controllers/skillController.js
const Skill = require("../models/skills");

// Create a new skill
const createSkill = async (req, res) => {
  try {
    const { title, item } = req.body;
    if (!title || !item) {
      return res.status(400).json({ message: "Both title and item are required." });
    }
    const skill = new Skill({ title, item });
    await skill.save();
    res.status(201).json({ message: "Skill created", skill });
  } catch (err) {
    console.error("Create Skill Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all skills
const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.status(200).json({ skills });
  } catch (err) {
    console.error("Get All Skills Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a skill by ID
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.item !== undefined) updates.item = req.body.item;

    const skill = await Skill.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json({ message: "Skill updated", skill });
  } catch (err) {
    console.error("Update Skill Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a skill by ID
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json({ message: "Skill deleted" });
  } catch (err) {
    console.error("Delete Skill Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createSkill,
  getAllSkills,
  updateSkill,
  deleteSkill,
};
