const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../config/cloudinaryConfig");
const { handleAddHomepageImage, handleGetHomepageImage } = require("../controllers/homepageImageController");
const { handleAddPortfolioImage, handleGetPortfolioImage } = require("../controllers/portfolioImage");

router.post(
  "/homepage-image/add",
  auth,
  upload.single("image"),
  handleAddHomepageImage
);
router.post(
  "/portfolio-image/add",
  auth,
  upload.single("image"),
  handleAddPortfolioImage
);
router.get("/homepage-image", handleGetHomepageImage);
router.get("/portfolio-image", handleGetPortfolioImage);

module.exports = router;
