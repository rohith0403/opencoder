const db = require("../models");
const Question = db.question;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.qname) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a question
  const question = new Question(
    req.body
    );

  // Save question in the database
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
  const qname = req.query.qname;
  var condition = qname ? { qname: { $regex: new RegExp(qname), $options: "i" } } : {};
  Question.find(condition)
    .then(data => {
      // loggerinfo.info("questions retreived.");
      res.send(data);
    })
    .catch(err => {
      // logger.error(err.message || "Some error occurred while retrieving questions.");
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
      // logger.error("Not found question with id " + id);
      res.status(404).send({ message: "Not found question with id " + id });
      }
      else res.send(data);
    })
    .catch(err => {
      // logger.error("Error retrieving question with id=" + id);
      res
        .status(500)
        .send({ message: "Error retrieving question with id=" + id });
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
  Question.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        // logger.error(`Cannot update question with id=${id}. Maybe question was not found!`);
        res.status(404).send({
          message: `Cannot update question with id=${id}. Maybe question was not found!`
        });
      } else res.send({ message: "question was updated successfully." });
    })
    .catch(err => {
      // logger.error("Error updating question with id=" + id);
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
        // logger.error(`Cannot delete question with id=${id}. Maybe question was not found!`);
        res.status(404).send({
          message: `Cannot delete question with id=${id}. Maybe question was not found!`
        });
      } else {
        // loggerinfo.info("question was deleted successfully!");
        res.send({
          message: "question was deleted successfully!"
        });
      }
    })
    .catch(err => {
      // logger.error("Could not delete question with id=" + id);
      res.status(500).send({
        message: "Could not delete question with id=" + id
      });
    });
};


