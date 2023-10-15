const collections = require("../../utilities/collections");

module.exports = async (req, res) => {
  try {
    let body = req.body;
    let user = await collections.users.findOne({ _id: body._id, isActive: true });
    if (!user) {
      return res.status(400).send({ message: "User not available" });
    }
    let isUserNameExist = await collections.users.find({
      $or: [{ userName: RegExp("^" + body.userName + "$", "i") }, { emailId: RegExp("^" + body.emailId + "$", "i") }],
    });
    if (isUserNameExist.length > 0) {
      return res.status(400).send({ message: "Username / EmailId already exist" });
    }
    user = Object.assign({}, body);
    await user.save();
    res.json(user);
  } catch (err) {
    console.log("Error occurred", err);
    res.status(400).send({
      message: err.message || "Failed to create user!",
    });
  }
};
