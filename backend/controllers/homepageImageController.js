const HomepageImage = require('../models/homepageImage');

const handleAddHomepageImage = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageURL = req.file.path; // Cloudinary returns the URL here
    const newImage = await HomepageImage.create({ image: imageURL });

    res.status(201).json({
      message: "Image uploaded successfully",
      image: newImage.image,
    });
  } catch (error) {
    console.error("Add image error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const handleGetHomepageImage = async (req, res) => {
  try {
    const image = await HomepageImage.findOne().sort({ createdAt: -1 }); 
    if (!image) {
      return res.status(404).json({ message: "No image found" });
    }
    res.status(200).json({ image: image.image });
  } catch (error) {
    console.error("Get image error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
    handleAddHomepageImage,
  handleGetHomepageImage
}