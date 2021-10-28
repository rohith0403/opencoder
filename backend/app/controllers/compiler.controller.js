const fs = require("fs");
const { exec } = require("child_process");

const saveFile = (name, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(name, data, function (err) {
      if (err) {
        console.log(err);
        reject();
      } else {
        console.log("The file was saved!");
        resolve();
      }
    });
  });
};

const deleteFile = (filename) => {
  fs.unlink(filename, function (err) {
    if (err) {
      console.log("SORRY NOT DELETED");
    }
    console.log("File deleted!");
  });
};

// Function for executing C codes
const cExecute = (data, input,directory) => {
  return new Promise((resolve, reject) => {
    const fileName = directory+".c";
    const inputfile = directory+".txt";
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
        exec("gcc " + fileName+" -o "+directory, (err, stdout, stderr) => {
          if (err) {
            // IF COMPILATION ERROR
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: `${err}`,
              error: stderr,
            });
          }

          exec("/"+directory+" < " + inputfile, (err, stdout, stderr) => {
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
const cPlusPlusExecute = (data, input,directory) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const fileName = directory+".cpp";
    const inputfile = directory+".txt";
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
        exec("g++ " + fileName+" -o "+directory, (err, stdout, stderr) => {
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
          exec("/"+directory+" < " + inputfile, (err, stdout, stderr) => {
            if (err) {
              console.log("ERROR " + err);
              resolve({
                err: true,
                output: `${err}`,
                error: stderr,
              });
            }
          //   deleteFile(inputfile+".txt");
          // deleteFile("/"+directory);
          // deleteFile(fileName+".cpp");
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
const javaExecute = (data, input,directory) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const fileName = directory+".java";
    const inputfile = directory+".txt";
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
        exec("javac " + fileName, (err, stdout, stderr) => {
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
          exec("java test < " + inputfile, (err, stdout, stderr) => {
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
const pythonExecute = (data, input,directory) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const fileName = directory+".py";
    const inputfile = directory+".txt";
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
const javascriptExecute = (data, input,directory) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const fileName = directory+".js";
    const inputfile = directory+".txt";
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