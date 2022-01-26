const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Task = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    finished: {
      type: DataTypes.BOOLEAN,
    },
    created_at: {
      type: DataTypes.STRING,
    },
    finished_at: {
      type: DataTypes.STRING,
    },
    update_at: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "tasks",
  }
);

module.exports = Task;
