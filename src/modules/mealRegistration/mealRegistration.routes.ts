import { Router } from "express";
import validationRequest from "../../middleware/validationRequest";
import { MealRegistrationValidation } from "./melRegistration.validation";
import { MealRegistrationController } from "./mealRegistrationController";

const router = Router();
router.post(
  "/create",
  validationRequest(
    MealRegistrationValidation.createMealRegistrationValidationSchema
  ),
  MealRegistrationController.createMealRegistration
);
router.get("/find-all", MealRegistrationController.getAllRegisteredMeal);
router.get(
  "/find-by-month-year",
  validationRequest(MealRegistrationValidation.findRegisteredMealValidation),
  MealRegistrationController.getRegisteredMealByMonth
);

export const MealRegistrationRoutes = router;
