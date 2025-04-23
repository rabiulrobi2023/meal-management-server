/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { User } from "../user/user.model";
import AppError from "../../error/AppError";
import { userIdGenerator } from "../user/user.utils";
import { Member } from "./member.model";
import { TMember } from "../member/member.interface";
import { TUser } from "../user/user.interface";
import config from "../../config";
import { sendMail } from "../../utils/sendMail";
import mongoose from "mongoose";

const createMemberRequestIntoDB = async (memberData: TMember) => {
  const isEmailExists = await Member.findOne({ email: memberData.email });
  if (isEmailExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "The email id already used");
  }
  const result = await Member.create(memberData);
  return result;
};

const appoveMemberRequestIntoDB = async (id: string) => {
  const isMemberRequestExists = await Member.findById(id);
  if (!isMemberRequestExists) {
    throw new AppError(httpStatus.NOT_FOUND, "The member request is not found");
  }

  if (isMemberRequestExists.isApproved) {
    throw new AppError(httpStatus.BAD_REQUEST, "The member already approved");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newId = await userIdGenerator();

    const userData: Partial<TUser> = {
      id: newId,
      password: config.DEFAULT_PASS,
      email: isMemberRequestExists.email,
      mobileNumber: isMemberRequestExists.mobileNumber,
      isApproved: true,
      approvedAt: new Date(Date.now()),
    };
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Fail to create user");
    }

    const appovedMember = await Member.findByIdAndUpdate(
      id,
      { id: newId, isApproved: true },
      { new: true, session }
    );

    if (!appovedMember) {
      throw new AppError(httpStatus.NOT_MODIFIED, "Member not approved");
    }
    await session.commitTransaction();
    await session.endSession();
    sendMail(
      isMemberRequestExists.email,
      "Meal account approved ",
      `
  <div style="font-family: Arial, sans-serif; color: green;">
    <h2>Welcome</h2>
    <p style = "font-size:18px; color: gray">Hi ${isMemberRequestExists.name},<br> Your meal account request has been approved. Your meal ID is ${newId} and login password is ${config.DEFAULT_PASS}.</p> <br/>
    <p>Thanks,<br/>Meal Management System</p>
  </div>
`
    );
    return appovedMember;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.NOT_MODIFIED, err);
  }
};

export const MemberService = {
  createMemberRequestIntoDB,
  appoveMemberRequestIntoDB,
};
