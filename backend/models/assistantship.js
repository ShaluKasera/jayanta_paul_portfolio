const mongoose = require("mongoose");

const assistantshipSchema = new mongoose.Schema(
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

const Assistantship = mongoose.model("Assistantship", assistantshipSchema);
module.exports = Assistantship;
