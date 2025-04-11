import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { status } from "../../constant/status";
import { roles } from "../../constant/roles";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passworChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: roles,
      default: "member",
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: status,
      default: "inprogress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<TUser>("users", userSchema);
