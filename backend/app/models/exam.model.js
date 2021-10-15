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
    start_date: String,
    start_time: String,
    end_time: String,
    exam_time: Number,
  })
);

module.exports = Exam;