const Achievement = require("../models/achievements");

// Create a new achievement
const createAchievement = async (req, res) => {
  try {
    const { year, text } = req.body;

    // Validate inputs
    if (typeof year !== "number" || !text) {
      return res.status(400).json({ message: "Year (number) and text (string) are required." });
    }

    const achievement = new Achievement({ year, text });
    await achievement.save();

    res.status(201).json({ message: "Achievement created", achievement });
  } catch (err) {
    console.error("Create Achievement Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all achievements
const getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ year: -1 });
    res.status(200).json({ achievements });
  } catch (err) {
    console.error("Get All Achievements Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an achievement by ID
const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, text } = req.body;

    // Optional: validate inputs if provided
    const update = {};
    if (year !== undefined) {
      if (typeof year !== "number") {
        return res.status(400).json({ message: "Year must be a number." });
      }
      update.year = year;
    }
    if (text !== undefined) {
      update.text = text;
    }

    const achievement = await Achievement.findByIdAndUpdate(id, update, { new: true });
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    res.status(200).json({ message: "Achievement updated", achievement });
  } catch (err) {
    console.error("Update Achievement Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an achievement by ID
const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await Achievement.findByIdAndDelete(id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    res.status(200).json({ message: "Achievement deleted" });
  } catch (err) {
    console.error("Delete Achievement Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createAchievement,
  getAllAchievements,
  updateAchievement,
  deleteAchievement,
};
