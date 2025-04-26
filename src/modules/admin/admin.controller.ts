import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

const createAdmin = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AdminService.createAdminIntoDB(payload);
  sendResponse(res, {
    message: "Admin create successully",
    data: result,
  });
});

export const AdminContrller = {
  createAdmin,
};
