require("dotenv").config(); // Load env variables
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import fs from "fs";
import https from "https";
import http from "http";
import mongoose from "mongoose";

// Import GraphQL Schema and Resolvers
import userSchema from "./graphql/schema/user";
import userResolver from "./graphql/resolvers/user";

// Import Mongoose Models
import Channel from "./models/Channel";
import Message from "./models/Message";
import Team from "./models/Team";
import User from "./models/User"

// Contruct Models Object for Apollo Context
const mongooseModels = {
  Channel,
  Message,
  Team,
  User
};

// Construct the Schema
const schema = makeExecutableSchema({
  typeDefs: [
    userSchema
  ],
  resolvers: {
    ...userResolver
  }
});

// Initialize Express App
const app = express();

// Initialize ApolloServer
const apollo = new ApolloServer({
  schema,
  context: () => {
    return {
      mongooseModels
    }
  }
});
apollo.applyMiddleware({
  app,
  path: '/'
});

// Configure Environment Options
const configOpts = {
  production: {
    ssl: true,
    port: 443, // sudo command to run
    hostname: "myslackclone.com"
  },
  development: {
    ssl: false,
    port: process.env.PORT || 8080,
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
