const mongoose = require("mongoose");
const portfolioImageSchema = new mongoose.Schema(
  {
    image: {
  type: String,
  default: null,
},
  },
  { timestamps: true }
);

const PortfolioImage = mongoose.model("PortfolioImage", portfolioImageSchema);
module.exports = PortfolioImage;
