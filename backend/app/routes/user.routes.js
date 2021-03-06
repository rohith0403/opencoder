const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const question = require("../controllers/question.controller"); 
const exam = require("../controllers/exam.controller");
const marks = require("../controllers/marks.controller");
const { verifySignUp, verifyExam } = require("../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

// user
  app.post(
    "/api/test/users",
    [authJwt.verifyToken, authJwt.isAdmin,
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    controller.create);
  
  app.get(
    "/api/test/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAll);
  
  app.get(
    "/api/test/users/:id",
    [authJwt.verifyToken],
    controller.findOne);
  
  app.put(
    "/api/test/users/:id",
    [authJwt.verifyToken],
    controller.update);

  app.delete(
    "/api/test/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete);


// question
  app.post(
    "/api/test/questions",
    [authJwt.verifyToken, authJwt.isProfessor],
    question.create);
  
  app.get(
    "/api/test/questions",
    [authJwt.verifyToken, authJwt.isProfessor],
    question.findAll);

  app.get(
    "/api/test/enamequestions",
    [authJwt.verifyToken, authJwt.isStudent],
    question.findAllByEname);
  
  app.get(
    "/api/test/questions/:id",
    [authJwt.verifyToken, authJwt.isProfessor],
    question.findOne);

  app.get(
    "/api/test/questions/:id",
    [authJwt.verifyToken, authJwt.isProfessor],
    question.findOne);
  
  app.put(
    "/api/test/questions/:id",
    [authJwt.verifyToken, authJwt.isProfessor],
    question.update);

  app.delete(
    "/api/test/questions/:id",
    [authJwt.verifyToken, authJwt.isProfessor],
    question.delete);



// exam
  app.post(
    "/api/test/exams",
    [authJwt.verifyToken, authJwt.isProfessor,
      verifyExam.checkDuplicateExam],
    exam.create);

  app.get(
    "/api/test/exams",
    [authJwt.verifyToken, authJwt.isProfessor],
    exam.findAll);
  
  app.get(
    "/api/test/exams/:id",
    [authJwt.verifyToken, authJwt.isProfessor],
    exam.findOne);
  
  app.put(
    "/api/test/exams/:id",
    [authJwt.verifyToken, authJwt.isProfessor],
    exam.update);

  app.delete(
    "/api/test/exams/:id",
    [authJwt.verifyToken, authJwt.isProfessor],
    exam.delete);

  app.get(
    "/api/test/allexams",
    [authJwt.verifyToken, authJwt.isStudent ],
    exam.findAllForStudents);


// marks
  app.post(
    "/api/test/marks",
    [authJwt.verifyToken],
    marks.create);

  app.get(
    "/api/test/marks",
    [authJwt.verifyToken],
    marks.findAll);
  
  app.get(
    "/api/test/profmarks",
    [authJwt.verifyToken],
    marks.findAllDistinctStudents);
  
  app.get(
    "/api/test/indivmarks",
    [authJwt.verifyToken],
    marks.findAllByusername);

  app.get(
    "/api/test/marks/:id",
    [authJwt.verifyToken],
    marks.findOne);
  
  app.put(
    "/api/test/marks/:id",
    [authJwt.verifyToken],
    marks.update);

  app.delete(
    "/api/test/marks/:id",
    [authJwt.verifyToken],
    marks.delete);

};