import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ManagerService } from "./manager.service";

const createManager = catchAsync(async (req, res) => {
  const member = req.params.id;
  const payload = req.body;
  const result = await ManagerService.createManagerIntoDB(member, payload);
  sendResponse(res, {
    message: "New mangager create successfully",
    data: result,
  });
});

const getAllManager = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await ManagerService.getAllManagerFromDB(query);
  sendResponse(res, {
    message: `${
      result.length > 0 ? "Manager retrived successfully" : "Not found"
    }`,
    data: result,
  });
});

const closeManger = catchAsync(async (req, res) => {
  const id = req.params.id;
  await ManagerService.closeMangerIntoDB(id);
  sendResponse(res, {
    message: "The manager account close successfully",
    data: {},
  });
});

export const ManagerController = {
  createManager,
  getAllManager,
  closeManger,
};
