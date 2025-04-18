import { User } from "./user.model";

export const userIdGenerator = async () => {
  const lastUser = await User.findOne({ isApproved: true }).sort({
    approvedAt: -1,
  });

  let newId = 0;

  if (!lastUser) {
    newId = 1001;
  } else {
    newId = Number(lastUser?.id) + 1;
  }

  return newId;
};
