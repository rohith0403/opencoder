const fs = require("fs");
const { exec } = require("child_process");

const saveFile = (name, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(name, data, function (err) {
      if (err) {
        console.log(err);
        reject();
      } else {
        resolve();
      }
    });
  });
};

// Function for executing C codes
const cExecute = (data, input,file) => {
  return new Promise((resolve, reject) => {
    const fileName = file+".c";
    const inputfile = file+".txt";
    saveFile(fileName, data)
      .then(() => {
        // Create Input file
        fs.writeFile(inputfile, input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        // COMPILE THE CODE
        exec("gcc " + fileName+" -o "+file, (err, stdout, stderr) => {
          if (err) {
            // IF COMPILATION ERROR
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: `${err}`,
              error: stderr,
            });
          }

          exec("/"+file+" < " + inputfile, (err, stdout, stderr) => {
            if (err) {
              console.log("ERROR " + err);
              resolve({
                err: true,
                output: `${err}`,
                error: stderr,
              });
            }

            resolve({
              err: false,
              output: stdout,
            });
          });
        });
      })
      .catch(() => {
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
  });
};

// Function for executing C++ codes
const cPlusPlusExecute = (data, input,file) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const fileName = file+".cpp";
    const inputfile = file+".txt";
    saveFile(fileName, data)
      .then(() => {
        // Create Input file
        fs.writeFile(inputfile, input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });
        // COMPILE THE CODE
        exec("g++ " + fileName+" -o "+file, (err, stdout, stderr) => {
          if (err) {
            // IF COMPILATION ERROR
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: `${err}`,
              error: stderr,
            });
          }

          // SUCCESSFULL COMPILATION EXECUTING
          exec("/"+file+" < " + inputfile, (err, stdout, stderr) => {
            if (err) {
              console.log("ERROR " + err);
              resolve({
                err: true,
                output: `${err}`,
                error: stderr,
              });
            }
            resolve({
              err: false,
              output: stdout,
            });
          });
        });
      })
      .catch(() => {
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
  });
};

// Function for executing Java codes
const javaExecute = (data,input,file,directory) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const fileName = file+".java";
    const inputfile = file+".txt";
    saveFile(fileName, data)
      .then(() => {
        // Create Input file
        fs.writeFile(inputfile, input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        // COMPILE THE CODE
        exec("javac " + fileName, (err,stderr) => {
          if (err) {
            // IF COMPILATION ERROR
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: `${err}`,
              error: stderr,
            });
          }

          // SUCCESSFULL COMPILATION EXECUTING
          exec("java -cp "+directory+" test < " + inputfile, (err, stdout, stderr) => {
            if (err) {
              console.log("ERROR " + err);
              resolve({
                err: true,
                output: `${err}`,
                error: stderr,
              });
            }

            resolve({
              err: false,
              output: stdout,
            });
          });
        });
      })
      .catch(() => {
        console.log("ERROR SAVE FILE" + saveFileRes);
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
  });
};

// Function for execuing python code
const pythonExecute = (data, input,file) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const fileName = file+".py";
    const inputfile = file+".txt";
    saveFile(fileName, data)
      .then(() => {
        // Create Input file
        fs.writeFile(inputfile, input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        // COMPILE THE CODE
        exec(
          "python3 " + fileName + " < " + inputfile,
          (err, stdout, stderr) => {
            if (err) {
              // IF COMPILATION ERROR
              console.error(`exec error==: ${err}`);
              resolve({
                err: true,
                output: `${err}`,
                error: stderr,
              });
            }
            resolve({
              err: false,
              output: stdout,
            });
          }
        );
      })
      .catch(() => {
        console.log("ERROR SAVE FILE" + saveFileRes);
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
  });
};

// Function for executing JavaScript code
const javascriptExecute = (data, input,file) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const fileName = file+".js";
    const inputfile = file+".txt";
    saveFile(fileName, data)
      .then(() => {
        // Create Input file
        fs.writeFile(inputfile, input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });


        // COMPILE THE CODE
        exec("node " + fileName, (err, stdout, stderr) => {
          if (err) {
            // IF COMPILATION ERROR
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: `${err}`,
              error: stderr,
            });
          }

          // SUCCESSFULL COMPILATION EXECUTING
          exec("node test < " + inputfile , (err, stdout, stderr) => {
            if (err) {
              console.log("ERROR " + err);
              resolve({
                err: true,
                output: `${err}`,
                error: stderr,
              });
            }

            console.log("OUTPUT ", stdout);
            resolve({
              err: false,
              output: stdout,
            });
          });
        });
      })
      .catch(() => {
        console.log("ERROR SAVE FILE" + saveFileRes);
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
  });
};

module.exports = {
  cPlusPlusExecute,
  cExecute,
  javaExecute,
  javascriptExecute,
  pythonExecute,
};