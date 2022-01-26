const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./graphql/index");

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

app.use(bodyParser.json());
app.use(cors());

server.start().then(() => {
  server.applyMiddleware({ app });
});

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("server ready at http://localhost:5000");
  });
});
