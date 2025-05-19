import { model, Schema } from "mongoose";
import { TManager } from "./manager.interface";
import { managerStatus } from "../../constant/status.constant";
import { monthArr } from "../../constant/dateTime.constant";

const managerSchema = new Schema<TManager>(
  {
    memberId: {
      type: String,
      required: [true, "Manager ID is required"],
    },
    member: {
      type: Schema.Types.ObjectId,
      ref: "members",
      required: [true, "Member is required"],
    },
    month: {
      type: String,
      enum: monthArr,
      trim: true,
      required: [true, "Month is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(managerStatus),
      default: managerStatus.running,
    },
  },
  {
    timestamps: true,
  }
);

export const Manager = model<TManager>("managers", managerSchema);
