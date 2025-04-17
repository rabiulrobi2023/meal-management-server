import { z } from "zod";

export const createMemberValidationSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 digit")
    .max(16, "Password must be maximum 16 digit"),

  member: z.object({
    name: z.string({ required_error: "Name is required" }),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
      required_error: "Blood group is required",
    }),
    email: z.string({ required_error: "Email id is required" }).email(),
    mobileNumber: z
      .string({ required_error: "Mobile number is required" })
      .trim(),
    bankAccountNo: z.string({
      required_error: "Bank account number is required",
    }),
    bankBranchName: z.string({ required_error: "Branch name is required" }),
    bankRoutingNo: z.string({
      required_error: "Bank routing number is required",
    }),
    bKashNo: z.string().trim().optional(),
    rocketNo: z.string().trim().optional(),
    nagadNo: z.string().trim().optional(),
    isApplicableImamCost: z.boolean().optional().default(true),
    isApplicableHelperCost: z.boolean().optional().default(true),
    profileImage: z.string().optional(),
    isApproved: z.boolean().optional().default(false),
    status: z.enum(["in-progress", "block"]).optional().default("in-progress"),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const MemberValidation = {
  createMemberValidationSchema,
};
