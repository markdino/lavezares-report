import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  position: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, "First Name is required!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required!"],
  },
  middleName: {
    type: String,
  },
  image: {
    type: {
      name: { type: String, required: [true, "File name is required"] },
      url: { type: String, required: [true, "File url is required"] },
      size: { type: Number, required: [true, "File size is required"] },
      key: {
        type: String,
        required: [true, "File key identifier is required"],
      },
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
