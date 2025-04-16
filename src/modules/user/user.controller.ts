import { UserService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createMember = catchAsync(async (req, res) => {
  const pass = req?.body?.password;
  const payload = req.body;

  const result = await UserService.createMemberIntoDB(pass, payload);
  sendResponse(res, {
    message: "Member request sent successfull",
    data: result,
  });
});

export const UserController = {
  createMember,
};
