import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MemberService, UserService } from "./member.service";

const createMember = catchAsync(async (req, res) => {
  const pass = req?.body?.password || config.DEFAULT_PASS;
  const memberData = req.body.member;

  const result = await UserService.createMemberIntoDB(pass, memberData);
  sendResponse(res, {
    message: "Member creation request sent successfully",
    data: result,
  });
});

const approvedMember = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await MemberService.appovedMemberIntoDB(id);
  sendResponse(res, {
    message: "Member creation request approved",
    data: result,
  });
});
export const MemberController = {
  approvedMember,
  createMember,
};
