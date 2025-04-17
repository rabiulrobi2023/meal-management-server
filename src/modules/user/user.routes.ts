import validationRequest from "../../middleware/validationRequest";
import { MemberValidation } from "../member/member.validation";
import { UserController } from "./user.controller";
import { Router } from "express";

const router = Router();
router.post(
  "/create-member",
  validationRequest(MemberValidation.createMemberValidationSchema),
  UserController.createMember
);
export const UserRouter = router;
