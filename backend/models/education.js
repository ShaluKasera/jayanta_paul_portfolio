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
    },
    resumeURL: {
  type: String,
  default: null,
  validate: {
    validator: function (value) {
      if (!value) return true;
      return value.startsWith("http") && value.endsWith(".pdf");
    },
    message: "Resume must be a valid PDF URL",
  },
},
resumePublicId: {
  type: String,
  default: null,
},


  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationSchema);
module.exports = Education;
