const mongoose = require("mongoose");
const Mark = mongoose.model(
  "Mark",
  new mongoose.Schema({
    userId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    examId:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
      },
    questionId:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
    marks: Number,
  })
);

module.exports = Mark;