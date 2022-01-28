const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("my_database", "demo", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
