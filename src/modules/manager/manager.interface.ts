import { Types } from "mongoose";

export type TManager = {
  memberId: string;
  member: Types.ObjectId;
  month:
    | "Jan"
    | "Feb"
    | "Mar"
    | "Apr"
    | "May"
    | "Jun"
    | "Jul"
    | "Aug"
    | "Sep"
    | "Oct"
    | "Nov"
    | "Dec";
  year: number;
  status: "running" | "ended";
};
