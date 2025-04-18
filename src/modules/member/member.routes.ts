import { Router } from "express";
import { MemberController } from "./member.controller";
import validationRequest from "../../middleware/validationRequest";
import { MemberValidation } from "./member.validation";

const router = Router();

router.post(
  "/create-member",
  validationRequest(MemberValidation.createMemberValidationSchema),
  MemberController.createMember
);

router.patch("/approve-member/:id", MemberController.approvedMember);

export const MemberRotes = router;
