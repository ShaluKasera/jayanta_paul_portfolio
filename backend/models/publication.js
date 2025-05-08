const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema(
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

const Publication = mongoose.model("Publication", publicationSchema);
module.exports = Publication;
