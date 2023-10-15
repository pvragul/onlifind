module.exports = (mongoose) => {
  const Schema = mongoose.Schema;
  const authToken = new Schema(
    {
      authToken: {
        type: String,
        required: true,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        require: true,
      },
    },
    {
      timestamps: true,
      toObject: { virtuals: true, getters: true },
      toJSON: { virtuals: true, getters: true },
    }
  );
  return mongoose.model("auth-token", authToken);
};
