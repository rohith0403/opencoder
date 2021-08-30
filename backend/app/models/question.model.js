const mongoose = require("mongoose");

const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    userId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    qname: String,
    description: String
  })
);

module.exports = Question;