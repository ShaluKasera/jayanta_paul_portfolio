const mongoose = require("mongoose");
const resumeSchema = new mongoose.Schema(
  {
    resume: {
  type: String,
  default: null,
},
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);
module.exports = Resume;
