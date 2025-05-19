import { Types } from "mongoose";

export type TPurchaseMeal = {
  id: string;
  member: Types.ObjectId;
  registeredMeal: Types.ObjectId;
  date: Date;
  quantity: number;
};
