const postResolvers = require("./posts");
const userResolver = require("./users");

module.exports = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
};
