import mongoose from "mongoose";
import { ROLE } from "../../../../Utils/enums.js";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    required: true,
  },
  // recoveryEmail: {
  //   type: String,
  //   lowercase: true,
  //   match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  // },
  phone: {
    type: String,
    maxlength: 15,
    match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: [ROLE.ADMIN, ROLE.USER], //to avoid magic strings
      message: "{VALUE} is not supported",
    },
    default: ROLE.USER,
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
