import nodemailer from "nodemailer";
import config from "../config";
import { environment } from "../constant/environment";

export const sendMail = async (
  to: string | string[],
  sub: string,
  html: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: config.NODE_ENV === environment.pro ? 465 : 587,
    secure: config.NODE_ENV === environment.pro,
    auth: {
      user: config.SENDER_MAIL,
      pass: config.SENDER_MAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: `"Meal Management System" ${config.SENDER_MAIL}`,
    to: Array.isArray(to) ? to.join(",") : to,
    subject: sub,
    html,
  });
};
