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

export const ManagerController = {
  createManager,
};
