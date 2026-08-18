//graphql server.js code
require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const connectDB = require("./src/config/db");

const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");

const app = express();
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServers = async () => {
  await connectDB();
  await server.start();
  app.use("/graphql", expressMiddleware(server));
  app.listen(5000, () => {
    console.log("Server running on 5000");
    console.log("Graphql:http://localhost:5000/graphql");
  });
};

startServers();
