const collections = require("../utilities/collections");

module.exports = (executer) => async (req, res, next) => {
  if (!req || !res) return;
  let response = await executer(collections, req);
  res.status(response.status).send(response.body);
};
