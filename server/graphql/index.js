const { gql } = require("apollo-server-express");
const Task = require("../models/Task");

exports.typeDefs = gql`
  type Task {
    id: ID
    title: String
    description: String
    finished: Boolean
    created_at: String
    finished_at: String
    update_at: String
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    newTask(
      title: String
      description: String
      finished: Boolean
      created_at: String
    ): Task
  }
`;

exports.resolvers = {
  Query: {
    tasks: async () => {
      return await Task.findAll();
    },
  },

  Mutation: {
    newTask: async (obj, { title, description, finished, created_at }) => {
      const task = await Task.create({
        title,
        description,
        finished,
        created_at,
      });
      return task.dataValues;
     
    },
  },
};
