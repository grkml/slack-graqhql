require("dotenv").config(); // Load env variables
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
//import typeDefs from "./graphql/schema";
//import resolvers from "./graphql/resolvers";
import fs from "fs";
import https from "https";
import http from "http";
import mongoose from "mongoose";

// Import GraphQL Schema and Resolvers
import userSchema from "./graphql/schema/user";
import User from "./graphql/resolvers/user";

// Construct the Schema
const schema = makeExecutableSchema({
  typeDefs: [
    userSchema
  ],
  resolvers: {
    ...User
  }
})

// Initialize Express App
const app = express();

// Initialize ApolloServer
const apollo = new ApolloServer({ schema });
apollo.applyMiddleware({ app });

// Configure Environment Options
const configOpts = {
  production: {
    ssl: true,
    port: 443, // sudo command to run
    hostname: "myslackclone.com"
  },
  development: {
    ssl: false,
    port: 8080,
    hostname: "localhost"
  }
};
const env = process.env.NODE_ENV;
const config = configOpts[env];

// Configure Server (HTTP or HTTPS)
let server;
if (config.ssl) {
  server = https.createServer({
      // SSL Certificates
      key: fs.readFileSync(`./ssl/${env}/server.key`),
      cert: fs.readFileSync(`./ssl/${env}/server.crt`)
    },
    app
  );
}
else {
  server = http.createServer(app);
}

// Add subscription support
apollo.installSubscriptionHandlers(server);

// Connect Database (MongoDB)
const db = process.env.MONGODB_URI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.log("Error:", err);
    throw new Error("MongoDB Connection Failed");
  });

// Launch Server
server.listen({ port: config.port }, () =>
  console.log(
    "🚀 Server ready at",
    `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}${
      apollo.graphqlPath
    }`
  )
);
