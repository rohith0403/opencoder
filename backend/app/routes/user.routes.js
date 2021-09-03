const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const question = require("../controllers/question.controller"); 

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);
  
// admin
  app.post(
    "/api/test/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.create);
  
  app.get(
    "/api/test/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAll);
  
  app.get(
    "/api/test/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findOne);
  
  app.put(
    "/api/test/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update);

  app.delete(
    "/api/test/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete);
  



// professor
  app.post(
    "/api/test/questions",
    [authJwt.verifyToken, authJwt.isProfessor],
    question.create
  );
  
  app.get(
    "/api/test/questions",
    [authJwt.verifyToken, authJwt.isProfessor],
    question.findAll);
  
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

};