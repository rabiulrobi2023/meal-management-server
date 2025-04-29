import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ManagerService } from "./manager.service";

const createManager = catchAsync(async (req, res) => {
  const member = req.params.id;
  const payload = req.body;
  const result = await ManagerService.createManagerIntoDB(member, payload);
  sendResponse(res, {
    message: "New mangager create successfull",
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

export const ManagerController = {
  createManager,
  getAllManager,
};
