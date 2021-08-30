const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

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
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

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
  




  // app.get(
  //   "/api/test/student", 
  //   [authJwt.verifyToken,authJwt.isStudent], 
  //   controller.studentBoard);

  app.get(
    "/api/test/prof",
    [authJwt.verifyToken, authJwt.isProfessor],
    controller.professorBoard
  );

};