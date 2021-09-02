const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  // Validate request
  console.log("req body ",req.body);
  if (!req.body.username) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    email: req.body.email,
    // phone: req.body.phone,
  });

  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
  User.find(condition)
    .then(data => {
      // loggerinfo.info("Users retreived.");
      res.send(data);
    })
    .catch(err => {
      // logger.error(err.message || "Some error occurred while retrieving users.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log("ID is ",id);
  User.findById(id)
    .then(data => {
      if (!data){
      // logger.error("Not found User with id " + id);
      res.status(404).send({ message: "Not found User with id " + id });
      }
      else res.send(data);
    })
    .catch(err => {
      // logger.error("Error retrieving User with id=" + id);
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
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
  req.body.password = bcrypt.hashSync(req.body.password, 8)
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        // logger.error(`Cannot update User with id=${id}. Maybe User was not found!`);
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      // logger.error("Error updating User with id=" + id);
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        // logger.error(`Cannot delete User with id=${id}. Maybe User was not found!`);
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        // loggerinfo.info("User was deleted successfully!");
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      // logger.error("Could not delete User with id=" + id);
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.studentBoard = (req, res) => {
    res.status(200).send("Student Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.professorBoard = (req, res) => {
    res.status(200).send("Professor Content.");
  };



