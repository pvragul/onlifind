const collections = require("../../utilities/collections");

module.exports = async (req, res) => {
  let data = await collections.users.findOne({ _id: req?.query?.userId });
  res.json(data);
};
