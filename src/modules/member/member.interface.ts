import { Types } from "mongoose";

export type TMember = {
  id: string;
  user: Types.ObjectId;
  name: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  email: string;
  mobileNumber: string;
  bankAccountNo: string;
  bankBranchName: string;
  bankRoutingNo: string;
  bKashNo: string;
  rocketNo: string;
  nagadNo: string;
  isApplicableImamCost: boolean;
  isApplicableHelperCost: boolean;
  profileImage: string;
  isApproved: boolean;
  status: "in-progress" | "block";
  isDeleted: boolean;
};
