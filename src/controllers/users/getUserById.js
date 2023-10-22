const { userNotFoundError, userAccountDeletedError } = require("../../helpers/errorCodes");

module.exports = async (collections, req) => {
  try {
    let data = await collections.users.findOne({ _id: req?.query?.userId });
    if (!data) {
      throw userNotFoundError;
    }
    if (data?.isDeleted) {
      throw userAccountDeletedError;
    }
    return {
      status: 200,
      body: {
        data,
      },
    };
  } catch (err) {
    return {
      status: 200,
      body: {
        message: err.message || "Failed to fetch user!",
      },
    };
  }
};
