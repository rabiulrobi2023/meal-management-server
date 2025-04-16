import { model, Schema } from "mongoose";
import { TMember } from "./member.interface";

const memberSchema = new Schema<TMember>(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    bankAccountNo: {
      type: Number,
      required: true,
      trim: true,
    },

    bankBranchName: {
      type: String,
      required: true,
    },

    bankRoutingNo: {
      type: Number,
      required: true,
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
    isAppliedImamCost: {
      type: Boolean,
      default: true,
    },
    isAppliedHelperCost: {
      type: Boolean,
      default: true,
    },

    profileImage: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
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

export const Member = model<TMember>("members", memberSchema);
