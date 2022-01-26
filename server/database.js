const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("my_database", "user", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
