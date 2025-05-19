import { z } from "zod";

import { currentYear, monthArr } from "../../constant/dateTime.constant";

const managerValidationSchema = z.object({
  month: z.enum(monthArr, { required_error: "Month is required" }),
  year: z
    .number()
    .max(currentYear + 1, `Year value must not exceed${currentYear + 1}`)
    .min(currentYear, `Year value must be at least ${currentYear} `),
});
export const ManagerValidation = {
  managerValidationSchema,
};
