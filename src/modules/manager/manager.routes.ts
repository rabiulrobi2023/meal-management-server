import { Router } from "express";
import { ManagerController } from "./manager.controller";
import { ManagerValidation } from "./manager.validation";
import validationRequest from "../../middleware/validationRequest";

const router = Router();
router.post(
  "/create-manager/:id",
  validationRequest(ManagerValidation.managerValidationSchema),
  ManagerController.createManager
);

export const ManagerRouter = router;
