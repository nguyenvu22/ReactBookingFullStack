import mongoose from "mongoose";
// const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    country: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } //Help Created and Updated at the same time
);

export default mongoose.model("User", UserSchema);
