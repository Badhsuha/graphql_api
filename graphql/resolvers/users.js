const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server");

const User = require("../../models/User");
const { SECRET_KEY } = require("../../config");
const {
  validateResgisterInput,
  validateLoginInput,
} = require("../../utils/validation");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { err, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Error", { err });
      }

      const user = await User.findOne({ username });
      if (!user) {
        err.general = "No user found";
        throw new UserInputError("Error", { err });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        err.general = "Invalid compination of Username and Password";
        throw new UserInputError("Error", { err });
      }

      token = generateToken(user);

      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const { err, valid } = validateResgisterInput(
        username,
        password,
        confirmPassword,
        email
      );
      if (!valid) {
        throw new UserInputError("Errors", { err });
      }

      const user = await User.findOne({ username });
      const userE = await User.findOne({ email });
      if (user) {
        throw new UserInputError("Username is already taken", {
          errors: {
            username: "this username is taken",
          },
        });
      }
      if (userE) {
        throw new UserInputError("Email Id is already taken", {
          errors: {
            username: "this Email Id is taken",
          },
        });
      }
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },
  },
};
