//graphql server.js code

const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const path = require('path');
const fs = require('fs')

const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");

const app = express();
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServers = async () => {
  await server.start();
  app.use("/graphql", expressMiddleware(server));
  app.listen(5000, () => {
    console.log("Server running on 5000");
    console.log("Graphql:http://localhost:5000/graphql");
  });
};

startServers()
