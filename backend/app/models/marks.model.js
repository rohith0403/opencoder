const mongoose = require("mongoose");
const Mark = mongoose.model(
  "Mark",
  new mongoose.Schema({
    userId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    username:String,
    examId:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
      },
    examname:String,
    questionId:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
    questionname: String,
    marks: Number,
  })
);

module.exports = Mark;