import { gql } from "apollo-server-express";

export default gql `
  type Channel {
    id: ID!
    # teamId: ID!
    name: String!
    publicChannel: Boolean!
    messages: [Message!]!
    users: [User!]
  }
`;
