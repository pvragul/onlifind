module.exports = async (collections, request) => {
  let data = await collections.users.find({ isActive: true, isDeleted: false });
  return {
    status: 200,
    body: data,
  };
};
