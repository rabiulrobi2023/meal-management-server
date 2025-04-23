import { Router } from "express";
import { MemberController } from "./member.controller";
import validationRequest from "../../middleware/validationRequest";
import { MemberValidation } from "./member.validation";

const router = Router();

router.post(
  "/create-member-request",
  validationRequest(MemberValidation.createMemberValidationSchema),
  MemberController.createMemberRequest
);

router.patch("/approve-member/:id", MemberController.approvedMemberRequest);

export const MemberRotes = router;
