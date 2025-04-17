import { UserService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createMember = catchAsync(async (req, res) => {
  const pass = req?.body?.password;
  const memberData = req.body.member;

  const result = await UserService.createMemberIntoDB(pass, memberData);
  sendResponse(res, {
    message: "Member creation request sent successfully",
    data: result,
  });
});

export const UserController = {
  createMember,
};
