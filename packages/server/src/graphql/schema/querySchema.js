import { gql } from "apollo-server-express";

export default gql `
  type Query {
    getUser(id: ID!): User!
    allUsers: [User!]!
  }
`;
