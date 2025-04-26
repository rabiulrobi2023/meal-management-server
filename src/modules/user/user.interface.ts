export type TUser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  passworChangeAt: Date;
  email: string;
  mobileNumber: string;
  role: "admin" | "manager" | "member";
  approvedAt: Date;
  status: "in-progress" | "block";
  isDeleted: boolean;
};
