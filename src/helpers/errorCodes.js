const error = (msg) => {
  return new Error(msg);
};
module.exports.userNotFoundError = error("User Not Found");
module.exports.userAccountDeletedError = error("User account deleted already");
module.exports.userNameOrEmailExistsError = error("Username / EmailId already exist");
