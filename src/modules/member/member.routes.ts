import { Router } from "express";
import { MemberController } from "./member.controller";
import validationRequest from "../../middleware/validationRequest";
import { MemberValidation } from "./member.validation";

const router = Router();

router.post(
  "/create-account-request",
  validationRequest(MemberValidation.createMemberValidationSchema),
  MemberController.createMemberRequest
);
router.patch("/approve-account/:id", MemberController.approvedMemberRequest);
router.get("/all-member", MemberController.getAllMember);
router.get("/:id", MemberController.getSingleMember);
router.delete(
  "/reject-account-request/:id",
  MemberController.rejectAccountRequest
);

export const MemberRotes = router;
