const Post = require("../../models/Post");
const { authenticateToken } = require("../../utils/validation");
const { AuthenticationError } = require("apollo-server");

module.exports = {
  Mutation: {
    async deletePost(_, { postId }, context) {
      const user = authenticateToken(context);

      try {
        const post = await Post.findById(postId);

        if (user.username === post.username) {
          await post.delete();
          return "Post deleted sucessfully";
        } else {
          throw new AuthenticationError("Action not allowd");
        }
      } catch (err) {
        throw new Error("Post not found");
      }
    },

    async createPost(_, { body }, context) {
      const user = authenticateToken(context);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      return post;
    },

    createComment: async (_, { postId, body }, context) => {
      const { username } = authenticateToken(context);

      try {
        const post = await Post.findById(postId);
        if (post) {
          post.comments.unshift({
            body,
            username,
            createdAt: new Date().toISOString(),
          });
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = authenticateToken(context);

      try {
        const post = await Post.findById(postId);
        if (post) {
          const commentIndex = post.comments.findIndex(
            (c) => c.id === commentId
          );
          if (post.comments[commentIndex].username === username) {
            post.comments = post.comments.filter((c) => c.id !== commentId);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError("No autorization");
          }
        } else {
          throw new Error("No post found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async likePost(_, { postId }, context) {
      const { username } = authenticateToken(context);

      try {
        const post = await Post.findById(postId);
        if (post) {
          console.log(username);
          if (post.likes.find((like) => like.username === username)) {
            post.likes = post.likes.filter(
              (like) => like.username !== username
            );
          } else {
            post.likes.push({
              username,
              createdAt: new Date().toISOString(),
            });
          }
          await post.save();
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new AuthenticationError("Post Not fount");
      }
    },
  },

  Query: {
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found !");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
