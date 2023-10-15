const {
  isValidObjectId,
  mongo: { ObjectId },
} = require("mongoose");
// const collections = require("../../utilities/collections").default;

module.exports = async (collections, req) => {
  try {
    let userId = req.query.userId;
    if (!isValidObjectId(userId)) {
      throw new Error("Invalid user details");
    }
    let isUserExist = await collections.users.findOne({ _id: ObjectId(userId) });
    if (!isUserExist) {
      throw new Error("User does not exist");
    }
    isUserExist.isDeleted = false;
    await isUserExist.save();
    return {
      status: 200,
      body: {
        message: "Successfully deactivated the account",
      }
    };
  } catch (err) {
    console.log("Error occurred", err);
    res.status(400).send({
      message: err.message || "Failed to create user!",
    });
  }
};
