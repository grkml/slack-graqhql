import { gql } from "apollo-server-express";

export default gql `
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    createTeam(name: String!): Boolean!
  }
`;
