const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
  }
  type User {
    id: ID!
    username: String!
    token: String!
    createdAt: String!
  }
  input ResgisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getPost: [Post]
  }

  type Mutation {
    register(registerInput: ResgisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
