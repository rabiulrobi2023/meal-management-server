import {Types } from "mongoose";

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: string;
  email: string;
  mobileNumber: string
  profileImage: string;
  isDeleted: boolean;
};
