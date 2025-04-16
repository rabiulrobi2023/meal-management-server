import config from "../../config";
import { TMember } from "../member/member.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createMemberIntoDB = async (pass: string, payload: TMember) => {
  const userData: Partial<TUser> = {
    id: "55555",

    password: pass || config.DEFAULT_PASS,
    email: payload.email,
  };

  const result = await User.create(userData);
  return result;
};

export const UserService = {
  createMemberIntoDB,
};
