import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join((process.cwd(), ".env")),
});

export default {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  DEFAULT_PASS: process.env.DEFAULT_PASS,
  BCRYPT_SALT_ROUN: process.env.BCRYPT_SALT_ROUN,
};
