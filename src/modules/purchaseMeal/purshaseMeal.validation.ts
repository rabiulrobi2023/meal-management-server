import { z } from "zod";
const createPurchaseMealValidation = z.object({
  id: z.string(),
  registeredMeal: z.string(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in YYYY-MM-DD format",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date",
    }),
  quantity: z.number().min(1,).max(20),
});

export const PurschaseMealValidation = {
  createPurchaseMealValidation,
};
