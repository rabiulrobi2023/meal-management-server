/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import moment from "moment";
import { TManager } from "./manager.interface";
import AppError from "../../error/AppError";
import { Manager } from "./manager.model";
import { Member } from "../member/member.model";
import { User } from "../user/user.model";
import mongoose from "mongoose";
import { roles } from "../../constant/role.constant";
import { sendMail } from "../../utils/sendMail";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFieldOfManager } from "./manager.constant";
import { managerStatus } from "../../constant/status.constant";

const createManagerIntoDB = async (
  memberObjId: string,
  payload: Partial<TManager>
) => {
  const haveRunningManger = await Manager.findOne({ status: "running" });
  if (haveRunningManger) {
    throw new AppError(httpStatus.CONFLICT, "Already have a running manager");
  }

  const memberData = await Member.findById(memberObjId);

  if (!memberData) {
    throw new AppError(httpStatus.NOT_FOUND, "Member not found");
  }

  if (memberData?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You cannot make this member a manager because the account is already deleted."
    );
  }

  if (!memberData.isApproved) {
    throw new AppError(httpStatus.BAD_REQUEST, "This member is not approved");
  }

  const userData = await User.findById(memberData?.user);
  if (userData?.status === "block") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You cannot make this member a manager because the account is already blocked."
    );
  }

  if (userData?.role === roles.admin) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user cannot be manager");
  }

  const payloadMonth = payload.month;
  const payloadYear = payload.year;

  const payloadMonthYear = `${payloadMonth}-${payloadYear}`;
  const currentMonthYear = moment().format("MMM-YYYY");
  const nextMonthYear = moment()
    .endOf("month")
    .add(1, "day")
    .format("MMM-YYYY");

  if (
    payloadMonthYear !== currentMonthYear &&
    payloadMonthYear !== nextMonthYear
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Invalid month. Month must be ${currentMonthYear} or ${nextMonthYear}`
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const managerData: Partial<TManager> = {
      member: memberData._id,
      memberId: memberData.id,
      month: payloadMonth,
      year: payloadYear,
    };

    const newManager = await Manager.create([managerData], { session });
    if (!newManager.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Fail to create manager");
    }

    const updateUser = await User.findByIdAndUpdate(
      memberData.user,
      { role: roles.manager },
      { new: true, session }
    );

    if (!updateUser) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Fail to create manager due to user update issue"
      );
    }

    await session.commitTransaction();
    await session.endSession();

    sendMail(
      memberData.email,
      `Meal Manager of ${payloadMonth}-${payloadYear}`,
      `
      <div style="font-family: Arial, sans-serif;color:green; font-size:16px">
        <h1>Welcome</h1>
        <p style = "color: gray">Hi <span style="color:green">${memberData.name}</span>,<br> You are now the manager of the Meal Management System for the month of <span style = "color: #c94c4c">${payloadMonthYear}</span> .</p>
        <br/>
        <p>Thanks,<br/>Meal Management System</p>
      </div>
    `
    );

    return newManager;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

const getAllManagerFromDB = async (query: Record<string, unknown>) => {
  const allManager = new QueryBuilder(Manager.find().populate("member"), query)
    .search(searchableFieldOfManager)
    .filter()
    .sort()
    .fields()
    .limit()
    .paginate();

  const result = allManager.queryModel;
  return result;
};

const closeMangerIntoDB = async (id: string) => {
  const manager = await Manager.findById(id);
  if (!manager) {
    throw new AppError(httpStatus.NOT_FOUND, "The manager not found");
  }
  if (manager.status === managerStatus.ended) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "The manager is already closed."
    );
  }

  const member = await Member.findById(manager.member, {
    user: 1,
    name: 1,
    email: 1,
    _id: 0,
  });

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const changeManagerStatus = await Manager.findByIdAndUpdate(
      id,
      {
        status: managerStatus.ended,
      },
      { new: true, session }
    );

    if (!changeManagerStatus) {
      throw new AppError(
        httpStatus.BAD_GATEWAY,
        "Failed to close the manager account"
      );
    }

    const changeUserStatus = await User.findByIdAndUpdate(
      member?.user,
      { role: roles.member },
      { new: true, session }
    );

    if (!changeUserStatus) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Unable to close the manager account"
      );
    }
    await session.commitTransaction();
    await session.endSession();

    sendMail(
      member?.email as string,
      `Managing Duty Close`,
      `
      <div style="font-family: Arial, sans-serif;color:gray; font-size:16px;">
        <h1 style="font-size:16px">Dear <span style="color:green">${member?.name}</span>,</h1>
        <p style = "color: gray">Your managing duty for the month of <span style="color:#c94c4c">${manager.month}-${manager.year}</span> has been successfully closed. Many thanks for your effort and dedication. You are now reinstated as a regular member of the system.</p>
        <br/>
        <p>Thanks,<br/>Meal Management System</p> 
      </div>
    `
    );

    return changeManagerStatus;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

export const ManagerService = {
  createManagerIntoDB,
  getAllManagerFromDB,
  closeMangerIntoDB,
};
