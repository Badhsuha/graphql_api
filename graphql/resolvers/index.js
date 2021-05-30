const postResolvers = require("./posts");
const userResolver = require("./users");

module.exports = {
  Post: {
    likesCount: (parent) => parent.likes.length,
    commentsCount: (parent) => parent.comments.length,
  },

  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolvers.Mutation,
  },
};
