import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MemberService } from "./member.service";

const createMemberRequest = catchAsync(async (req, res) => {
  const memberData = req.body;
  const result = await MemberService.createAccountIntoDB(memberData);
  sendResponse(res, {
    message: "Account request sent successfully",
    data: result,
  });
});

const approvedMemberRequest = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await MemberService.approveAccountIntoDB(id);
  sendResponse(res, {
    message: "The account is approved",
    data: result,
  });
});

const getAllMember = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await MemberService.getAllmemberFromDB(query);

  sendResponse(res, {
    message:
      result.length > 0
        ? "Member retrieved successfully."
        : "There is no any member",
    data: result,
  });
});

const getSingleMember = catchAsync(async (req, res) => {
  const memberId = req.params.id;
  const result = await MemberService.getSingleMemberFromDB(memberId);
  sendResponse(res, {
    message: "Member retrieved successfully.",
    data: result,
  });
});

const rejectAccountRequest = catchAsync(async (req, res) => {
  const id = req.params.id;
  await MemberService.rejectAccountRequest(id);
  sendResponse(res, {
    message: "The account creation request has been rejected.",
    data: {},
  });
});

export const MemberController = {
  createMemberRequest,
  approvedMemberRequest,
  getAllMember,
  getSingleMember,
  rejectAccountRequest,
};
