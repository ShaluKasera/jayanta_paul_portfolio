const Responsibility = require("../models/responsibility");

// Create a new responsibility
const createResponsibility = async (req, res) => {
  try {
    const { year, text } = req.body;
    if (!year || !text) {
      return res.status(400).json({ message: "Both year and text are required." });
    }

    const responsibility = new Responsibility({ year, text });
    await responsibility.save();

    res.status(201).json({ message: "Responsibility created", responsibility });
  } catch (err) {
    console.error("Create Responsibility Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all responsibilities
const getAllResponsibilities = async (req, res) => {
  try {
    const responsibilities = await Responsibility.find().sort({ createdAt: -1 });
    res.status(200).json({ responsibilities });
  } catch (err) {
    console.error("Get All Responsibilities Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a responsibility by ID
const updateResponsibility = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};
    if (req.body.year !== undefined) updates.year = req.body.year;
    if (req.body.text !== undefined) updates.text = req.body.text;

    const responsibility = await Responsibility.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!responsibility) {
      return res.status(404).json({ message: "Responsibility not found" });
    }
    res.status(200).json({ message: "Responsibility updated", responsibility });
  } catch (err) {
    console.error("Update Responsibility Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a responsibility by ID
const deleteResponsibility = async (req, res) => {
  try {
    const { id } = req.params;
    const responsibility = await Responsibility.findByIdAndDelete(id);
    if (!responsibility) {
      return res.status(404).json({ message: "Responsibility not found" });
    }
    res.status(200).json({ message: "Responsibility deleted" });
  } catch (err) {
    console.error("Delete Responsibility Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createResponsibility,
  getAllResponsibilities,
  updateResponsibility,
  deleteResponsibility,
};
