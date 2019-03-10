import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import fs from "fs";
import https from "https";
import http from "http";

const apollo = new ApolloServer({ typeDefs, resolvers });

const app = express();
apollo.applyMiddleware({ app });

// Launch an HTTPS or HTTP server, per configuration
let server;
const configurations = {
  // Note: You may need sudo to run on port 443
  production: { ssl: true, port: 443, hostname: "example.com" },
  development: { ssl: false, port: 8080, hostname: "localhost" }
};
const environment = process.env.NODE_ENV; // Set as development in .env
const config = configurations[environment];
if (config.ssl) {
  // Assumes certificates are in .ssl folder from package root.
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

// Add subscription support
apollo.installSubscriptionHandlers(server);

server.listen({ port: config.port }, () =>
  console.log(
    "🚀 Server ready at",
    `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}${
      apollo.graphqlPath
    }`
  )
);
