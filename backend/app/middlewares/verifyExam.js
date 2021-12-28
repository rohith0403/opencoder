const db = require("../models");
const Exam = db.exam;

checkDuplicateExam = (req, res, next) => {
    Exam.findOne({
        ename: req.body.ename
    }).exec((err, exam) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (exam) {
        res.status(400).send({ message: "Failed! Exam Name is already in use!" });
        return;
      }
       next(); 
    });
  };

  const verifyExam = {
    checkDuplicateExam
  };
  
  module.exports = verifyExam;