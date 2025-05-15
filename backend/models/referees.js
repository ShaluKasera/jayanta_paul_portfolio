const mongoose = require("mongoose");

const refereesSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      department: {
        type: String,
        required: true,
      },
      institute: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'], 
      },
    },
  { timestamps: true }
);

const Referee = mongoose.model("Referee", refereesSchema);
module.exports = Referee;