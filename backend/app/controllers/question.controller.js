const db = require("../models");
const Question = db.question;
const Exam = db.exam;

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.qname || !req.body.description) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const examid = await Exam.findOne({ename:req.body.ename});
  // Create a question
  const question = new Question({
    userId:req.body.userId,
    examId:examid,
    ename:req.body.ename,
    qname:req.body.qname,
    description:req.body.description,
    testcase1: req.body.testcase1,
    testcase2: req.body.testcase2,
    testcase3: req.body.testcase3,
    testcase4: req.body.testcase4,
    testcase5: req.body.testcase5,
    output1: req.body.output1,
    output2: req.body.output2,
    output3: req.body.output3,
    output4: req.body.output4,
    output5: req.body.output5,
  });
  question
    .save(question)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while creating the question."
      });
    });
};

// Retrieve all questions from the database.
exports.findAll = (req, res) => {
  var ObjectID = require('mongodb').ObjectID;
  const qname = req.query.qname;

  var condition = qname ? { qname: { $regex: new RegExp(qname), $options: "i" },"userId": new ObjectID(req.userId)}  : {"userId": new ObjectID(req.userId)};

  Question.find(condition )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving questions."
      });
    });
};

exports.findAllByEname = (req, res) => {
  const ename = req.query.ename;
  var condition = ename ? { ename: { $regex: new RegExp(ename), $options: "i" }}  : {};

  Question.find(condition )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving questions."
      });
    });
};

// Find a single question with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Question.findById(id)
    .then(data => {
      if (!data){
      res.status(404).send({ message: "Not found question with id " + id });
      }
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving question with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  Question.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update question with id=${id}. Maybe question was not found!`
        });
      } else res.send({ message: "question was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating question with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Question.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete question with id=${id}. Maybe question was not found!`
        });
      } else {
        res.send({
          message: "question was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete question with id=" + id
      });
    });
};


