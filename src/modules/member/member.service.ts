/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { User } from "../user/user.model";
import AppError from "../../error/AppError";
import mongoose from "mongoose";
import { userIdGenerator } from "../user/user.utils";
import { Member } from "./member.model";
import { TMember } from "../member/member.interface";
import { TUser } from "../user/user.interface";

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
      password: pass,
      email: memberData.email,
    };
    session.startTransaction();
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Fail to sent user creation request"
      );
    }

    memberData.user = newUser[0]?._id;

    const newMember = await Member.create([memberData], { session });
    if (!newMember.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Fail to sent member creation request"
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return newMember;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

export const UserService = {
  createMemberIntoDB,
};

const appovedMemberIntoDB = async (id: string) => {
  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (isUserExist.isApproved) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already approved");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newId = await userIdGenerator();

    const approvedUser = await User.findByIdAndUpdate(
      id,
      {
        id: newId,
        isApproved: true,
        approvedAt: Date.now(),
      },
      { new: true, session }
    );

    if (!approvedUser) {
      throw new AppError(httpStatus.NOT_MODIFIED, "User not approved");
    }

    const appovedMember = await Member.findOneAndUpdate(
      { user: id },
      { id: approvedUser?.id, isApproved: true },
      { new: true, session }
    );

    if (!appovedMember) {
      throw new AppError(httpStatus.NOT_MODIFIED, "Member not approved");
    }

    await session.commitTransaction();
    await session.endSession();

    return appovedMember;
  } catch {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.NOT_MODIFIED, "Member not approved..");
  }
};

export const MemberService = {
  createMemberIntoDB,
  appovedMemberIntoDB,
};
