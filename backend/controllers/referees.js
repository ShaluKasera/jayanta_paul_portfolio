const Referee = require("../models/referees");

// Create a new referee
const createReferee = async (req, res) => {
  try {
    const { name, position, department, institute, phone, email } = req.body;

    // Basic validation
    if (!name || !position || !department || !institute || !phone || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const referee = new Referee({ name, position, department, institute, phone, email });
    await referee.save();

    res.status(201).json({ message: "Referee created", referee });
  } catch (err) {
    console.error("Create Referee Error:", err);
    // Mongoose validation error (e.g. email format)
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all referees
const getAllReferees = async (req, res) => {
  try {
    const referees = await Referee.find().sort({ createdAt: -1 });
    res.status(200).json({ referees });
  } catch (err) {
    console.error("Get All Referees Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a referee by ID
const updateReferee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = (({ name, position, department, institute, phone, email }) => 
      ({ name, position, department, institute, phone, email }))(req.body);

    const referee = await Referee.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!referee) {
      return res.status(404).json({ message: "Referee not found" });
    }
    res.status(200).json({ message: "Referee updated", referee });
  } catch (err) {
    console.error("Update Referee Error:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a referee by ID
const deleteReferee = async (req, res) => {
  try {
    const { id } = req.params;
    const referee = await Referee.findByIdAndDelete(id);
    if (!referee) {
      return res.status(404).json({ message: "Referee not found" });
    }
    res.status(200).json({ message: "Referee deleted" });
  } catch (err) {
    console.error("Delete Referee Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createReferee,
  getAllReferees,
  updateReferee,
  deleteReferee,
};
