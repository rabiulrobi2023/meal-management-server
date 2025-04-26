import { User } from "../user/user.model";

export const memberIdGenerator = async () => {
  const lastUser = await User.findOne({
    isApproved: true,
    role: "member",
  }).sort({
    approvedAt: -1,
  });

  let newId = "";

  if (!lastUser) {
    newId = "1001";
  } else {
    newId = (Number(lastUser?.id) + 1).toString().padStart(3, "0");
  }

  return newId;
};
