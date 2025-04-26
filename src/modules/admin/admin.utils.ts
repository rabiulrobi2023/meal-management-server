import { User } from "../user/user.model";

export const adminIdGenerator = async () => {
  const lastAdminId = await User.findOne({ role: "admin" }, { id: 1 }).sort(
    "-createdAt"
  );
  //A001
  let newId = "";
  if (!lastAdminId) {
    newId = "A001";
  } else {
    const lastId = Number(lastAdminId?.id?.substring(1, 4)) + 1;
    newId = `A${lastId.toString().padStart(3, "0")}`;
  }
  return newId;
};
