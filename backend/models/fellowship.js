const mongoose = require("mongoose");

const fellowshipSchema = new mongoose.Schema(
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

const Fellowship = mongoose.model("Fellowship", fellowshipSchema);
module.exports = Fellowship;
