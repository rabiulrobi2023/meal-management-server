import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MemberService } from "./member.service";

const createMemberRequest = catchAsync(async (req, res) => {
  const memberData = req.body;
  const result = await MemberService.createMemberRequestIntoDB(memberData);
  sendResponse(res, {
    message: "Member creation request sent successfully",
    data: result,
  });
});

const approvedMemberRequest = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await MemberService.appoveMemberRequestIntoDB(id);
  sendResponse(res, {
    message: "The member is approved",
    data: result,
  });
});
export const MemberController = {
  createMemberRequest,
  approvedMemberRequest,
};
