const mongoose = require("mongoose");

const Question = mongoose.model(
  "Question",
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
    ename: String,
    qname: String,
    description: String,
    testcases:[{
      type: String
    }]
  })
);

module.exports = Question;