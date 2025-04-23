import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { status } from "../../constant/status";
import { roles } from "../../constant/roles";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: Number,
      required: true,
      trim: true,
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
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      trim: true,
      required: true,
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
    approvedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: status,
      default: "in-progress",
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

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.BCRYPT_SALT_ROUN)
  );
  next();
});

userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser>("users", userSchema);
