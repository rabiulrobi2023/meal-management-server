import { Types } from "mongoose";

export type TMember = {
  id: string;
  user: Types.ObjectId;
  name: string;
  email: string;
  bankAccountNo: number;
  bankBranchName: string;
  bankRoutingNo: number;
  bKashNo: string;
  rocketNo: string;
  nagadNo: string;
  isAppliedImamCost: boolean;
  isAppliedHelperCost: boolean;
  profileImage: string;
  isApproved: boolean;
  status: "inprogress" | "block";
  isDeleted: boolean;
};
