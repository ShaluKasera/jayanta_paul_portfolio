// controllers/assistantshipController.js

const Assistantship = require("../models/assistantship");

// Create a new assistantship
const createAssistantship = async (req, res) => {
  try {
    const { year, text } = req.body;

    if (!year || !text) {
      return res.status(400).json({ message: "Both year and text are required." });
    }

    const assistantship = new Assistantship({ year, text });
    await assistantship.save();

    res.status(201).json({ message: "Assistantship created", assistantship });
  } catch (err) {
    console.error("Create Assistantship Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all assistantships
const getAllAssistantship = async (req, res) => {
  try {
    const assistantships = await Assistantship.find().sort({ createdAt: -1 });
    res.status(200).json({ assistantships });
  } catch (err) {
    console.error("Get All Assistantships Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an assistantship by ID
const updateAssistantship = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, text } = req.body;

    const updates = {};
    if (year !== undefined) updates.year = year;
    if (text !== undefined) updates.text = text;

    const assistantship = await Assistantship.findByIdAndUpdate(id, updates, { new: true });
    if (!assistantship) {
      return res.status(404).json({ message: "Assistantship not found" });
    }

    res.status(200).json({ message: "Assistantship updated", assistantship });
  } catch (err) {
    console.error("Update Assistantship Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an assistantship by ID
const deleteAssistantship = async (req, res) => {
  try {
    const { id } = req.params;
    const assistantship = await Assistantship.findByIdAndDelete(id);
    if (!assistantship) {
      return res.status(404).json({ message: "Assistantship not found" });
    }
    res.status(200).json({ message: "Assistantship deleted" });
  } catch (err) {
    console.error("Delete Assistantship Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createAssistantship,
  getAllAssistantship,
  updateAssistantship,
  deleteAssistantship,
};
