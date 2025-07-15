import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", schema);
export default UserModel;
