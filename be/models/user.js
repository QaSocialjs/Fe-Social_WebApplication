import mongoose from "mongoose";
import bcrypt from "bcrypt";

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please comfirm your password!"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same",
      },
    },
    friends: {
      type: Array,
      default: [],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    jwtToken: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    console.log("sdadsd");
    const salt = await bcrypt.genSalt();
    const passwordHashing = await bcrypt.hash(this.password, salt);
    this.password = passwordHashing;
    this.passwordConfirm = undefined;
    next();
  } catch (error) {
    next(error);
  }
});
const User = mongoose.model("User", userSchema);
export default User;
