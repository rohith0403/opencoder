const db = require("../models");
const Exam = db.exam;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.ename) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a exam
  const exam = new Exam(
    req.body
    );

  // Save exam in the database
  exam
    .save(exam)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the exam."
      });
    });
};

// Retrieve all exams from the database.
exports.findAll = (req, res) => {
  console.log("question");
  var ObjectID = require('mongodb').ObjectID;
  const ename = req.query.ename;

  // var condition = ename ? { ename: { $regex: new RegExp(ename), $options: "i" },"userId": new ObjectID(req.userId)}  : {"userId": new ObjectID(req.userId)};
  // changed to this line to get all questions without userId
  var condition = ename ? { ename: { $regex: new RegExp(ename), $options: "i" }}  : {};

  Exam.find(condition )
    .then(data => {
      // loggerinfo.info("exams retreived.");
      res.send(data);
    })
    .catch(err => {
      // logger.error(err.message || "Some error occurred while retrieving exams.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving exams."
      });
    });
};

// Find a single exam with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Exam.findById(id)
    .then(data => {
      if (!data){
      // logger.error("Not found exam with id " + id);
      res.status(404).send({ message: "Not found exam with id " + id });
      }
      else res.send(data);
    })
    .catch(err => {
      // logger.error("Error retrieving exam with id=" + id);
      res
        .status(500)
        .send({ message: "Error retrieving exam with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    // logger.error("Data to update cannot be empty!");
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  Exam.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        // logger.error(`Cannot update exam with id=${id}. Maybe exam was not found!`);
        res.status(404).send({
          message: `Cannot update exam with id=${id}. Maybe exam was not found!`
        });
      } else res.send({ message: "exam was updated successfully." });
    })
    .catch(err => {
      // logger.error("Error updating exam with id=" + id);
      res.status(500).send({
        message: "Error updating exam with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Exam.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        // logger.error(`Cannot delete exam with id=${id}. Maybe exam was not found!`);
        res.status(404).send({
          message: `Cannot delete exam with id=${id}. Maybe exam was not found!`
        });
      } else {
        // loggerinfo.info("exam was deleted successfully!");
        res.send({
          message: "exam was deleted successfully!"
        });
      }
    })
    .catch(err => {
      // logger.error("Could not delete exam with id=" + id);
      res.status(500).send({
        message: "Could not delete exam with id=" + id
      });
    });
};


