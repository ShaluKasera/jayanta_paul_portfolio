const Publication = require("../models/publication");

// Create a new publication
const createPublication = async (req, res) => {
  try {
    const { year, text } = req.body;
    if (!year || !text) {
        return res.status(400).json({ message: "Both year and text are required." });
      }
    const publication = new Publication({ year, text });
    await publication.save();
    res.status(201).json({ message: "Publication created", publication });
  } catch (err) {
    console.error("Create Publication Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all publications
const getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find().sort({ year: -1 });
    res.status(200).json({ publications });
  } catch (err) {
    console.error("Get All Publications Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Update a publication by ID
const updatePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, text } = req.body;
    const updates = {};
    if (year !== undefined) updates.year = year;
    if (text !== undefined) updates.text = text;

    const publication = await Publication.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }
    res.status(200).json({ message: "Publication updated", publication });
  } catch (err) {
    console.error("Update Publication Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a publication by ID
const deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const publication = await Publication.findByIdAndDelete(id);
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }
    res.status(200).json({ message: "Publication deleted" });
  } catch (err) {
    console.error("Delete Publication Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createPublication,
  getAllPublications,
  updatePublication,
  deletePublication,
};
