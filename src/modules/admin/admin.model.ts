import mongoose, { model, Schema } from "mongoose";
import { TAdmin } from "./admin.interface";

const adminSchema = new mongoose.Schema<TAdmin>(
  {
    id: {
      type: String,
      required: [true, "Name is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User id is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email id is required"],
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
    },
    profileImage: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Admin = model<TAdmin>("admins", adminSchema);
