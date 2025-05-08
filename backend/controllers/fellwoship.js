const Fellowship = require("../models/fellowship");

// Create a new fellowship
const createFellowship = async (req, res) => {
  try {
    const { year, text } = req.body;
    if (!year || !text) {
      return res.status(400).json({ message: "Both year and text are required." });
    }
    const fellowship = new Fellowship({ year, text });
    await fellowship.save();
    res.status(201).json({ message: "Fellowship created", fellowship });
  } catch (err) {
    console.error("Create Fellowship Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all fellowships
const getAllFellowship = async (req, res) => {
  try {
    const fellowships = await Fellowship.find().sort({ createdAt: -1 });
    res.status(200).json({ fellowships });
  } catch (err) {
    console.error("Get All Fellowships Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a fellowship by ID
const updateFellowship = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, text } = req.body;
    const updates = {};
    if (year !== undefined) updates.year = year;
    if (text !== undefined) updates.text = text;
    const fellowship = await Fellowship.findByIdAndUpdate(id, updates, { new: true });
    if (!fellowship) {
      return res.status(404).json({ message: "Fellowship not found" });
    }
    res.status(200).json({ message: "Fellowship updated", fellowship });
  } catch (err) {
    console.error("Update Fellowship Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a fellowship by ID
const deleteFellowship = async (req, res) => {
  try {
    const { id } = req.params;
    const fellowship = await Fellowship.findByIdAndDelete(id);
    if (!fellowship) {
      return res.status(404).json({ message: "Fellowship not found" });
    }
    res.status(200).json({ message: "Fellowship deleted" });
  } catch (err) {
    console.error("Delete Fellowship Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createFellowship,
  getAllFellowship,
  updateFellowship,
  deleteFellowship,
};
