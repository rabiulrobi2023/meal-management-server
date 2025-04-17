/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../error/AppError";
import { TMember } from "../member/member.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import mongoose from "mongoose";
import { Member } from "../member/member.model";

const createMemberIntoDB = async (pass: string, memberData: TMember) => {
  const isEmailExist = await User.findOne({
    email: memberData.email,
  });

  if (isEmailExist) {
    throw new AppError(httpStatus.CONFLICT, "The email already exist");
  }
  const session = await mongoose.startSession();
  try {
    const userData: Partial<TUser> = {
      password: pass || config.DEFAULT_PASS,
      email: memberData.email,
    };
    session.startTransaction();
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Fail to create user");
    }

    memberData.user = newUser[0]?._id;

    const newMember = await Member.create([memberData], { session });
    if (!newMember.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Fail to sent member request");
    }

    session.commitTransaction();
    session.endSession();
    return newUser;
  } catch {
    session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Falil to create member request"
    );
  }
};

export const UserService = {
  createMemberIntoDB,
};
