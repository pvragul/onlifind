module.exports = (Schema) =>
  new Schema({
    first: {
      type: String,
      index: true,
      required: [true, "First name is Required"],
    },
    last: {
      type: String,
      index: true,
    },
  });
