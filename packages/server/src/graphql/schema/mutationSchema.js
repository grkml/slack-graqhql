import { gql } from "apollo-server-express";

export default gql `
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    createTeam(name: String!): Boolean!
    createChannel(teamId: ID!, name: String!, publicChannel: Boolean=false): Boolean!
    createMessage(channelId: ID!, text: String!): Boolean!
  }
`;
