import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
   
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
