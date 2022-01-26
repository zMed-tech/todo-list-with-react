const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database");

const app = express();

app.use(bodyParser.json());
app.use(cors());

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("server ready at http://localhost:5000");
  });
});
