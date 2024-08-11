import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100
    },
    email: {
      type: String,
      required: true,
      maxLength: 100,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minLength: 5
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    },
    occupation: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    transactions: {
      type: Array
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "admin"
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

export default User;