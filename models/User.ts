import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  firstName: { type: String},
  lastName: { type: String},
  phoneNumber: {type: String, required: true, unique: true},
  email: { type: String},
  password: { type: String },
  image: { type: String },
  role: { type: String, default: "USER" }, // USER or ADMIN
})

export const User = mongoose.models?.User || mongoose.model("User", userSchema)
