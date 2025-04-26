import { z } from "zod";

const createAdminValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email type" }),
  mobileNumber: z.string({ required_error: "Mobile number is required" }),
});

export const AdminValidation = {
  createAdminValidationSchema,
};
