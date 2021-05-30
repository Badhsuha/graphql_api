module.exports.validateResgisterInput = (
  username,
  password,
  confirmPassword,
  email
) => {
  const err = {};

  if (username.trim() === "") {
    err.username = "User name must not be empty";
  }

  if (email.trim() === "") {
    err.email = "Email name must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      err.email = email;
    }
  }

  if (password === "") {
    err.password = "Password must not be empty";
  } else {
    if (password !== confirmPassword) {
      err.confirmPassword = "Password must be match";
    }
  }

  return { err, valid: Object.keys(err).length < 1 };
};

module.exports.validateLoginInput = (username, password) => {
  const err = {};
  if (username.trim() === "") {
    err.username = "Username must not be empty";
  }

  if (password === "") {
    err.password = "Password must not be empty";
  }

  return {
    err,
    valid: Object.keys(err).length < 1,
  };
};
