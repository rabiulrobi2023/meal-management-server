import { Types } from "mongoose";
import { monthLiteral } from "../../constant/dateTime.constant";

export type TManager = {
  memberId: string;
  member: Types.ObjectId;
  month: monthLiteral;
  year: number;
  status: "running" | "ended";
};
