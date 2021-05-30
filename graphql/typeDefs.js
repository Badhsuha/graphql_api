const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
    comments: [comment]!
    likes: [like]!
    likesCount: Int!
    commentsCount: Int!
  }

  type like {
    id: ID!
    username: String!
    createdAt: String!
  }
  type comment {
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
    getPosts: [Post]
    getPost(postId: ID!): Post!
  }

  type Mutation {
    register(registerInput: ResgisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String): Post!
    likePost(postId: ID!): Post!
  }
`;
