const router = require("express").Router();
const fs = require("fs");
const execute = require("../controllers/compiler.controller");
const path = require("path");

router.get("/test", (req, res) => {
  res.json({ msg: "code route" });
});

const deleteFile = (filename) => {
  fs.unlink(filename, function (err) {
    if (err) {
      console.log("SORRY NOT DELETED");
    }
    console.log("File deleted!");
  });
};

router.post("/submit", (req, res) => {
  const code = req.body.code;
  const input = req.body.input;
  const lang = req.body.lang;
  const directory = "/home/sanjay/"+req.body.examid+"/"+req.body.userid+"/";
  if (!fs.existsSync(directory)){
    fs.mkdirSync(directory, { recursive: true });
  }
  const filename = directory+req.body.questionid;
  switch (lang) {
    case "cpp":
      return execute
        .cPlusPlusExecute(code,input,filename)
        .then((data) => {
          console.log("SENDING " + JSON.stringify(data));
          res.json(data);
          deleteFile(filename+".txt");
          deleteFile("/"+filename);
          // deleteFile(filename+".cpp");
        })
        .catch((err) => {
          console.log("ERROR PROMISE " + err);
          deleteFile(filename+".txt");
          deleteFile("/"+filename);
          // deleteFile(filename+".cpp");
        });
    case "c":
      return execute
        .cExecute(code,input,filename)
        .then((data) => {
          res.json(data);
          deleteFile(filename+".txt");
          deleteFile("/"+filename);
          // deleteFile(filename+".c");
        })
        .catch((err) => {
          console.log("ERROR PROMISE " + err);
          deleteFile(filename+".txt");
          deleteFile("/"+filename);
          // deleteFile(filename+".c");
        });

    case "java":
      return execute
        .javaExecute(code,input,filename)
        .then((data) => {
          res.json(data);
          deleteFile(filename+".txt");
          // deleteFile(filename+".java");
          deleteFile(filename+".class");
        })
        .catch((err) => {
          console.log("ERROR PROMISE " + err);
          deleteFile(filename+".txt");
          // deleteFile(filename+".java");
          deleteFile(filename+".class");
        });

    case "python":
      return execute
        .pythonExecute(code,input,filename)
        .then((data) => {
          res.json(data);
          deleteFile(filename+".txt");
          // deleteFile(filename+".py");
        })
        .catch((err) => {
          console.log("ERROR PROMISE " + err);
          deleteFile(filename+".txt");
          // deleteFile(filename+".py");
        });

    case "javascript":
      return execute
        .javascriptExecute(code,input,filename)
        .then((data) => {
          res.json(data);
          deleteFile(filename+".txt");
          // deleteFile(filename+".js");
        })
        .catch((err) => {
          console.log("ERROR PROMISE " + err);
          deleteFile(filename+".txt");
          // deleteFile(filename+".js");
        });
  } 
});

module.exports = router;