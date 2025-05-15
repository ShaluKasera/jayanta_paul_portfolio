const mongoose = require("mongoose");

const personalInfoSchema = new mongoose.Schema(
  {
    title: {
      type:String, 
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PeronalInfo = mongoose.model("PeronalInfo", personalInfoSchema);
module.exports = PeronalInfo;
