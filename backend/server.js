const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./app/config/db.config");
const path = require('path');
const app = express();

var corsOptions = {
  origin: "http://192.168.1.8:8080"
};

app.use(cors(corsOptions));
app.use(express.static(path.resolve(__dirname, './build')));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/check", (req, res) => {
  res.json({ message: "Welcome to Open Coder." });
});


// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// files
const code = require("./app/routes/code.routes");
app.use("/api/code", code);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "student"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'student' to roles collection");
      });

      new Role({
        name: "professor"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'professor' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});