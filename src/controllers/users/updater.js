const { userNameOrEmailExistsError, userNotFoundError } = require("../../helpers/errorCodes");

module.exports = async (collections, req) => {
  try {
    let body = req.body;
    let user = await collections.users.findOne({ _id: body._id, isActive: true });
    if (!user) {
      throw userNotFoundError;
    }
    let isUserNameExist = await collections.users.find({
      $or: [{ userName: RegExp("^" + body.userName + "$", "i") }, { emailId: RegExp("^" + body.emailId + "$", "i") }],
    });
    if (isUserNameExist.length > 0) {
      throw userNameOrEmailExistsError;
    }
    user = Object.assign(user, body);
    await user.save();
    return {
      status: 200,
      body: {
        message: "Updated Successfully",
      },
    };
  } catch (err) {
    console.log("Error occurred", err);
    return {
      status: 400,
      body: {
        message: err.message || "Failed to create user!",
      },
    };
  }
};
