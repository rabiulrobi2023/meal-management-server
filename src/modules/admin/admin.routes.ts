import { Router } from "express";
import { AdminContrller } from "./admin.controller";
import validationRequest from "../../middleware/validationRequest";
import { AdminValidation } from "./admin.validation";

const router = Router();
router.post(
  "/create-admin",
  validationRequest(AdminValidation.createAdminValidationSchema),
  AdminContrller.createAdmin
);

export const AdminRouter = router;
