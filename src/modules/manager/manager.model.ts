import { model, Schema } from "mongoose";
import { TManager } from "./manager.interface";
import { months } from "../../constant/months";

const managerSchema = new Schema<TManager>({
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
    enum: months,
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
    enum: ["running", "ended"],
    default: "running",
  },
});

export const Manager = model<TManager>("managers", managerSchema);
