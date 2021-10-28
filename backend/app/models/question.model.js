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
    testcase1: [String],
    testcase2: [String],
    testcase3: [String],
    testcase4: [String],
    testcase5: [String],
    output1: String,
    output2: String,
    output3: String,
    output4: String,
    output5: String
  })
);

module.exports = Question;