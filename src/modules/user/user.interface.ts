import { Date } from "mongoose";

export type TUser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  passworChangeAt: Date;
  email: string;
  role: "admin" | "manager" | "member";
  isApproved: boolean;
  status: "in-progress" | "block";
  isDeleted: boolean;
};
