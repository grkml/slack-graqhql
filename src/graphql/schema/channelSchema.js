import { gql } from "apollo-server-express";

export default gql `
  type Channel {
    id: ID!
    name: String!
    public: Boolean!
    messages: [Message!]!
    users: [User!]
  }
`;
