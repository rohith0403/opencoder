const mongoose = require("mongoose");

const Exam = mongoose.model(
  "Exam",
  new mongoose.Schema({
    userId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    ename: String,
  })
);

module.exports = Exam;