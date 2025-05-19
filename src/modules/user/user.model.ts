import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { roles } from "../../constant/role.constant";
import bcrypt from "bcrypt";
import config from "../../config";
import { userStatus } from "../../constant/status.constant";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
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
      enum: Object.values(roles),
      default: roles.member,
    },
    approvedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: Object.values(userStatus),
      default: userStatus.inProgress,
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
