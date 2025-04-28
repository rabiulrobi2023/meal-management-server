import moment from "moment";
import { z } from "zod";
const year = Number(moment().format("YYYY"));

const managerValidationSchema = z.object({
  month: z.enum(
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    { required_error: "Month is required" }
  ),
  year: z
    .number()
    .max(Number(year) + 1, `Year value must be maximum ${Number(year) + 1}`)
    .min(Number(year), `Year value must be minimum ${Number(year)} `),
});
export const ManagerValidation = {
  managerValidationSchema,
};
