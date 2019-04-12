// TODO: Set SSL for final production

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import mongoose from "mongoose";
import ip from "ip";

// Import GraphQL Schema and Resolvers
import userSchema from "./graphql/schema/userSchema";
import teamSchema from "./graphql/schema/teamSchema";
import querySchema from "./graphql/schema/querySchema";
import mutationSchema from "./graphql/schema/mutationSchema";
import userResolver from "./graphql/resolvers/userResolver";
import teamResolver from "./graphql/resolvers/teamResolver";
import queryResolver from "./graphql/resolvers/queryResolver";
import mutationResolver from "./graphql/resolvers/mutationResolver";

// Import Mongoose Models
import Channel from "./models/Channel";
import Message from "./models/Message";
import Team from "./models/Team";
import User from "./models/User";

// Construct the Schema
const schema = makeExecutableSchema({
  typeDefs: [
    userSchema,
    teamSchema,
    querySchema,
    mutationSchema
  ],
  resolvers: {
    Team: teamResolver,
    User: userResolver,
    Query: queryResolver,
    Mutation: mutationResolver
  }
});

// Initialize Express App
const app = express();
const env = process.env.NODE_ENV;

// Test Route
app.get('/test', (req, res) => res.json({msg: "endpoint works"}));

// Serve React App or hit Server at "/"
if (env === "production")
  app.use('/', express.static("../client/build"));
else if (env === "development")
  app.get('/', (req, res) => res.redirect("/graphql"));
else
  app.get('/', (req, res) => res.status(500)).json({error: "$NODE_ENV"});
  
// Initialize ApolloServer
const apollo = new ApolloServer({
  schema,
  context: () => {
    return {
      mongooseModels: {
        Channel,
        Message,
        Team,
        User
      },
      user: {
        id: "5c883f986ee6670017f146b9" // Dummy Test ID...will user JWT's later
      }
    };
  }
});
apollo.applyMiddleware({
  app,
  path: "/graphql"
});

// Configure Environment Options
const configOpts = {
  // production: {
  //   ssl: true,
  //   port: 443, // sudo command to run
  //   hostname: "myslackclone.com"
  // },
  production: {
    ssl: false,
    port: process.env.PORT || 8080,
    hostname: "127.0.0.1"
  },
  development: {
    ssl: false,
    port: process.env.PORT || 8080,
    hostname: "127.0.0.1"
  }
};
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

// Connect to MongoDB and configure Mongoose
const db = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.log("Error: MongoDB Connection Failed");
    throw err;
  });
console.log(server.address());
// Launch Server
server.listen({ port: config.port }, () =>
  console.log(
    "🚀 Server ready at",
    `http${config.ssl ? "s" : ""}://${ip.address()}:${server.address().port}${
      apollo.graphqlPath
    }`
  )
);
