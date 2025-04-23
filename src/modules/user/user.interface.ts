

export type TUser = {
  id: number;
  password: string;
  needPasswordChange: boolean;
  passworChangeAt: Date;
  email: string;
  mobileNumber: string;
  role: "admin" | "manager" | "member";
  isApproved: boolean;
  approvedAt: Date;
  status: "in-progress" | "block";
  isDeleted: boolean;
};
