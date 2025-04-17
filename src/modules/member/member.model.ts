import { model, Schema } from "mongoose";
import { TMember } from "./member.interface";

const memberSchema = new Schema<TMember>(
  {
    id: {
      type: String,
      trim: true,
      default: "",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      ref: "users",
    },

    name: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    email: {
      type: String,
      required: [true, "Email id is required"],
    },
    mobileNumber: {
      type: String,
      trim: true,
      required: [true, "Mobile number is required"],
    },
    bankAccountNo: {
      type: String,
      required: [true, "Bank account number is required"],
      trim: true,
    },

    bankBranchName: {
      type: String,
      required: [true, "Branch name is required"],
    },

    bankRoutingNo: {
      type: String,
      required: [true, "Bank routing number is required"],
      trim: true,
    },

    bKashNo: {
      type: String,
      required: false,
      trim: true,
    },
    rocketNo: {
      type: String,
      required: false,
      trim: true,
    },
    nagadNo: {
      type: String,
      required: false,
      trim: true,
    },
    isApplicableImamCost: {
      type: Boolean,
      default: true,
    },
    isApplicableHelperCost: {
      type: Boolean,
      default: true,
    },

    profileImage: {
      type: String,
      default: "",
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["in-progress", "block"],
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

export const Member = model<TMember>("members", memberSchema);
