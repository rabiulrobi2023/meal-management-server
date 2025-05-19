import { Router } from "express";
import { PurchaseMealController } from "./purchaseMeal.controller";
import validationRequest from "../../middleware/validationRequest";
import { PurschaseMealValidation } from "./purshaseMeal.validation";

const router = Router();
router.post("/new", validationRequest(PurschaseMealValidation.createPurchaseMealValidation), PurchaseMealController.createPurchaseMeal);
export const PurchaseMealRouter = router;
