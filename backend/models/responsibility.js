const mongoose = require("mongoose");

const responsibilitySchema = new mongoose.Schema(
  {
    year: {
      type: String,  
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Responsibility = mongoose.model("Responsibility", responsibilitySchema);
module.exports = Responsibility;
