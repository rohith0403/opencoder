const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.question = require("./question.model");
db.exam = require("./exam.model");
db.marks = require("./marks.model");
db.ROLES = ["student", "admin", "professor"];

module.exports = db;