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
import { searchableField } from "./member.constat";
import QueryBuilder from "../../builder/QueryBuilder";

const createAccountIntoDB = async (memberData: TMember) => {
  const isEmailExists = await Member.findOne({ email: memberData.email });
  if (isEmailExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "The email id already used");
  }
  const result = await Member.create(memberData);
  return result;
};

const approveAccountIntoDB = async (id: string) => {
  const isAccountRequestExists = await Member.findById(id);
  if (!isAccountRequestExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "The account request is not found"
    );
  }

  if (isAccountRequestExists.isApproved) {
    throw new AppError(httpStatus.BAD_REQUEST, "The account already approved");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newId = await userIdGenerator();

    const userData: Partial<TUser> = {
      id: newId,
      password: config.DEFAULT_PASS,
      email: isAccountRequestExists.email,
      mobileNumber: isAccountRequestExists.mobileNumber,
      approvedAt: new Date(Date.now()),
    };
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Fail to create user");
    }

    const appovedAccount = await Member.findByIdAndUpdate(
      id,
      { id: newUser[0].id, isApproved: true, user: newUser[0]?._id },
      { new: true, session }
    );

    if (!appovedAccount) {
      throw new AppError(
        httpStatus.NOT_MODIFIED,
        "The account approval failed."
      );
    }
    await session.commitTransaction();
    await session.endSession();
    sendMail(
      isAccountRequestExists.email,
      "Meal account approved",
      `
  <div style="font-family: Arial, sans-serif; color: green;">
    <h2>Welcome</h2>
    <p style = "font-size:16px; color: gray">Hi ${isAccountRequestExists.name},<br> Your meal account request has been approved. Your meal ID is ${newId} and login password is ${config.DEFAULT_PASS}.</p> <br/>
    <p>Thanks,<br/>Meal Management System</p>
  </div>
`
    );
    return appovedAccount;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.NOT_MODIFIED, err);
  }
};

const getAllmemberFromDB = async (query: Record<string, unknown>) => {
  const allMembers = new QueryBuilder(
    Member.find({ isDeleted: false }).populate("user"),
    query
  )
    .search(searchableField)
    .filter()
    .sort()
    .fields()
    .limit()
    .paginate();
  const result = allMembers.queryModel;
  return result;
};

const getSingleMemberFromDB = async (memberId: string) => {
  const user = await User.findOne({ id: memberId });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "The account is not found.");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "The account is deleted.");
  }
  if (user.status === "block") {
    throw new AppError(httpStatus.FORBIDDEN, "The account is blocked.");
  }
  const result = await Member.findOne({ id: memberId });
  if (!result?.isApproved) {
    throw new AppError(httpStatus.FORBIDDEN, "The account is not approved.");
  }
  return result;
};

const rejectAccountRequest = async (id: string) => {
  const iAccountRequestExists = await Member.findById(id);
  if (!iAccountRequestExists) {
    throw new AppError(httpStatus.NOT_FOUND, "The request not fuound");
  }
  if (iAccountRequestExists.isApproved) {
    throw new AppError(httpStatus.CONFLICT, "The account already approved");
  }

  const result = await Member.findByIdAndDelete(id);
  return result;
};

export const MemberService = {
  createAccountIntoDB,
  approveAccountIntoDB,
  getAllmemberFromDB,
  getSingleMemberFromDB,
  rejectAccountRequest,
};
