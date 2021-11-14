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
      // console.log("SORRY NOT DELETED");
    }
    // console.log("File deleted!");
  });
};

router.post("/submit", (req, res) => {
  const code = req.body.code;
  const input = req.body.input;
  const lang = req.body.lang;
  const directory = "/home/sanjay/submissions/"+req.body.examname.split(" ").join("")+"/"+req.body.username.split(" ").join("")+"/";
  if (!fs.existsSync(directory)){
    fs.mkdirSync(directory, { recursive: true });
  }
  const filename = directory+req.body.questionname.split(" ").join("");
  switch (lang) {
    case "cpp":
      return execute
        .cPlusPlusExecute(code,input,filename)
        .then((data) => {
          res.json(data);
          deleteFile(filename+".txt");
          deleteFile("/"+filename);
          // deleteFile(filename+".cpp");
        })
        .catch((err) => {
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
          deleteFile(filename+".txt");
          deleteFile("/"+filename);
          // deleteFile(filename+".c");
        });

    case "java":
      return execute
        .javaExecute(code,input,filename,directory)
        .then((data) => {
          res.json(data);
          deleteFile(filename+".txt");
          // deleteFile(filename+".java");
          deleteFile(directory+"test.class");
        })
        .catch((err) => {
          deleteFile(filename+".txt");
          // deleteFile(filename+".java");
          deleteFile(directory+"test.class");
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
          deleteFile(filename+".txt");
          // deleteFile(filename+".js");
        });
  } 
});

module.exports = router;