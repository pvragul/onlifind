module.exports = async (collections, req) => {
  try {
    let body = req.body;
    let isUserNameExist = await collections.users.find({
      $or: [{ userName: RegExp("^" + body.userName + "$", "i") }, { emailId: RegExp("^" + body.emailId + "$", "i") }],
    });
    if (isUserNameExist.length > 0) {
      throw new Error("Username / EmailId already exist");
    }
    let newUser = await collections.users.create(body);
    return {
      statusCode: 201,
      body: {
        _id: newUser?._id,
      },
    };
  } catch (err) {
    console.log("Error occurred", err);
    return {
      statusCode: 400,
      body: {
        code: 1000,
        message: err.message,
      },
    };
  }
};
