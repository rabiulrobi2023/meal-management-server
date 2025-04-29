/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import moment from "moment";
import { TManager } from "./manager.interface";
import AppError from "../../error/AppError";
import { Manager } from "./manager.model";
import { Member } from "../member/member.model";
import { User } from "../user/user.model";
import mongoose from "mongoose";
import { roles } from "../../constant/roles";
import { sendMail } from "../../utils/sendMail";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFieldOfManager } from "./manager.constant";

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

  if (payloadMonthYear !== (currentMonthYear && nextMonthYear)) {
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
      `Meal Manager of ${payloadMonth}`,
      `
      <div style="font-family: Arial, sans-serif;color:green;">
        <h1>Welcome</h1>
        <p style = "font-size:16px; color: gray">Hi <span style="color:green">${memberData.name}</span>,<br> You are now the manager of the Meal Management System for the month of <span style = "color: #c94c4c">${payloadMonthYear}</span> .</p>
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
  const allManager = new QueryBuilder(Manager.find(), query)
    .search(searchableFieldOfManager)
    .filter()
    .sort()
    .fields()
    .limit()
    .paginate();

  const result = allManager.queryModel;
  return result;
};

export const ManagerService = {
  createManagerIntoDB,
  getAllManagerFromDB,
};
