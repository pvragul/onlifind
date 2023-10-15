module.exports = (mongoose) => {
  const bcrypt = require("bcryptjs");
  const Schema = mongoose.Schema;
  const NameSchema = require("./common/name")(Schema);
  const SALT_WORK_FACTOR = 10;
  const UserSchema = new Schema(
    {
      name: {
        type: NameSchema,
        required: [true, "Name is required"],
      },
      emailId: {
        type: String,
        required: [true, "Email Id required"],
        unique: true,
        index: true,
      },
      password: {
        type: String,
        required: [true, "Password required"],
      },
      userName: {
        type: String,
        required: [true, "UserName required"],
        unique: true,
        index: true,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      }
    },
    {
      timestamps: true,
      toObject: { virtuals: true, getters: true },
      toJSON: { virtuals: true, getters: true },
    }
  );
  UserSchema.pre("save", function (next) {
    var user = this;
    if (!user?.isModified("password")) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  });
  UserSchema.methods.comparePassword = function (newPassword) {
    return bcrypt.compareSync(this.password, newPassword);
  };
  return mongoose.model("users", UserSchema);
};
