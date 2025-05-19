import { z } from "zod";

import { mealArr } from "../../constant/meal.constant";
import { currentBDYear, monthArr } from "../../constant/dateTime.constant";

const createMealRegistrationValidationSchema = z.object({
  name: z.enum(mealArr, {
    required_error: "Meal name is required",
    invalid_type_error: "Invalid meal name",
  }),
  value: z.union([z.literal(0.5), z.literal(1), z.literal(1.5)], {
    required_error: "Meal value is required",
  }),
});

const findRegisteredMealValidation = z.object({
  month: z.enum(monthArr, {
    required_error: "Month name is required",
    invalid_type_error: "Month name is invalid",
  }),
  year: z
    .number()
    .min(2025, { message: "Year must be at least 2025" })
    .max(currentBDYear, { message: `Year must be maximum ${currentBDYear}` }),
});

export const MealRegistrationValidation = {
  createMealRegistrationValidationSchema,
  findRegisteredMealValidation,
};
