const db = require("../models");
const Marks = db.marks;

exports.create = async (req, res) => {
  // Create marks
  const marks = new Marks(
    req.body
    );

  // Save marks in the database
  marks
    .save(marks)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the marks."
      });
    });
};

// Retrieve all marks from the database.
exports.findAll = (req, res) => {
  var ObjectID = require('mongodb').ObjectID;
  const examId = req.query.examId;
  const userId = req.query.userId;
  var condition1 = examId ? { "examId": new ObjectID(examId),"userId": new ObjectID(userId)}  : {};
  Marks.find(condition1)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving marks."
      });
    });
};

exports.findAllDistinctStudents = (req, res) => {
  var ObjectID = require('mongodb').ObjectID;
  const examId = req.query.examId;
  const username = req.query.username;
  var condition = username ? { username: { $regex: new RegExp(username), $options: "i" },"examId": new ObjectID(examId)}  : {"examId": new ObjectID(examId)};
  Marks.find(condition).distinct("username")
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving marks."
      });
    });
};

exports.findAllByusername = (req, res) => {
  var ObjectID = require('mongodb').ObjectID;
  const examId = req.query.examId;
  const username = req.query.username;
  var condition = username ? { username: { $regex: new RegExp(username), $options: "i" },"examId": new ObjectID(examId)}  : {"examId": new ObjectID(examId)};
  Marks.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving marks."
      });
    });
};

// Find a single marks with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Marks.findById(id)
    .then(data => {
      if (!data){
      res.status(404).send({ message: "Not found marks with id " + id });
      }
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving marks with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  Marks.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update marks with id=${id}. Maybe marks was not found!`
        });
      } else res.send({ message: "marks was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating marks with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Marks.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete marks with id=${id}. Maybe marks was not found!`
        });
      } else {
        res.send({
          message: "marks was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete marks with id=" + id
      });
    });
};




