import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import fs from "fs";
import https from "https";
import http from "http";
import mongoose from "mongoose";

let server;

// Configure Dev or Production Server
const serverOptions = {
  // Note: You may need sudo to run on port 443
  production: {
    ssl: true,
    port: 443,
    hostname: "myslackclone.com"
  },
  development: {
    ssl: false,
    port: 8080,
    hostname: "localhost"
  }
};
const environment = process.env.NODE_ENV;
const config = serverOptions[environment];
if (config.ssl) {
  server = https.createServer(
    {
      key: fs.readFileSync(`./ssl/${environment}/server.key`),
      cert: fs.readFileSync(`./ssl/${environment}/server.crt`)
    },
    app
  );
} else {
  server = http.createServer(app);
}

// Connect MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(error => {
    throw new Error("MongoDB Connection Failed");
  });

// Initialize Express and ApolloServer
const app = express();
const apollo = new ApolloServer({
  typeDefs,
  resolvers
});
apollo.applyMiddleware({ app });

// Add subscription support
apollo.installSubscriptionHandlers(server);

// Launch Server
server.listen({ port: config.port }, () =>
  console.log(
    "🚀 Server ready at",
    `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}${
      apollo.graphqlPath
    }`
  )
);
