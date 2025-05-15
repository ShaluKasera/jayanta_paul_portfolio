const mongoose = require("mongoose");
const homepageImageSchema = new mongoose.Schema(
  {
    image: {
  type: String,
  default: null,
},
  },
  { timestamps: true }
);

const HomepageImage = mongoose.model("HomepageImage", homepageImageSchema);
module.exports = HomepageImage;
