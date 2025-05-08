const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    year: {
      type: Number, 
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Achievement = mongoose.model("Achievement", achievementSchema);
module.exports = Achievement;
