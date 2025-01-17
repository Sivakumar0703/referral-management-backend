import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  token: {
    type: String,
  },

  referredCandidates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
    },
  ],

  accountStatus: {
    type: String,
    enum: ["active", "deleted"],
    default: "active",
  },

  isAdmin:{
    type: Boolean,
    default: false
  }


});

const User = mongoose.model("User", userSchema);
export default User;
