import { UserService } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const createMember = catchAsync(async (req, res) => {
  const pass = req?.body?.password;
  const payload = req.body;

  const result = await UserService.createMemberIntoDB(pass, payload);
  res.status(200).json({
    success: true,
    message: "A request for create as meal member has sent successfull",
    data: result,
  });
});

export const UserController = {
  createMember,
};
