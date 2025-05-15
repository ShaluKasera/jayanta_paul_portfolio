const PortfolioImage = require("../models/portfolioImage");

const handleAddPortfolioImage = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageURL = req.file.path;
    const newImage = await PortfolioImage.create({ image: imageURL });

    res.status(201).json({
      message: "Portfolio image uploaded successfully",
      image: newImage.image,
    });
  } catch (error) {
    console.error("Add portfolio image error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleGetPortfolioImage = async (req, res) => {
  try {
    const image = await PortfolioImage.findOne().sort({ createdAt: -1 });
    if (!image) {
      return res.status(404).json({ message: "No portfolio image found" });
    }
    res.status(200).json({ image: image.image });
  } catch (error) {
    console.error("Get portfolio image error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  handleAddPortfolioImage,
  handleGetPortfolioImage,
};
