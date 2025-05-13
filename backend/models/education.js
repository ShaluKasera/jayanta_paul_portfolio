const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    year:{
      type:String,
      required:true,
    }
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationSchema);
module.exports = Education;
