/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { TAdmin } from "./admin.interface";
import mongoose from "mongoose";

import { adminIdGenerator } from "./admin.utils";
import { TUser } from "../user/user.interface";
import config from "../../config";
import { Admin } from "./admin.model";

const createAdminIntoDB = async (payload: Partial<TAdmin>) => {
  const isEmailExists = await User.findOne({ email: payload.email });
  if (isEmailExists) {
    throw new AppError(httpStatus.CONFLICT, "Email already registered");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await adminIdGenerator();
    const userInfo: Partial<TUser> = {
      id: id,
      password: config.DEFAULT_PASS,
      email: payload.email,
      mobileNumber: payload.mobileNumber,
      role: "admin",
    };

    const newUser = await User.create([userInfo], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Fail to create user");
    }

    const adminData = { ...payload, id: newUser[0]?.id, user: newUser[0]._id };
    const newAdmin = await Admin.create([adminData], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Fail to create admin");
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

export const AdminService = {
  createAdminIntoDB,
};
