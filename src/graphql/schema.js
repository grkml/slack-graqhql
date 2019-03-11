import { gql } from "apollo-server-express";

export default gql`
  type Query {
    testField: String
  }
`;

/*
export default gql`
  type Team {
    owner: User!
    members: [User!]!
    channels: [Channel!]!
  }

  type Channel {
    id: ID!
    name: String!
    public: Boolean!
    messages: [Message!]!
    users: [User!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
    channel: Channel!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    teams: [Team!]!
  }

  type Query {
    testField: String
  }
`;

*/
