import { model, Schema } from "mongoose";
import { TPurchaseMeal } from "./purchaseMeal.interface";
import {} from "../../constant/dateTime.constant";

const purchaseMealSchema = new Schema<TPurchaseMeal>(
  {
    id: {
      type: String,
      required: true,
    },
    member: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    registeredMeal: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Unacceptable meal number"],
      max: [5, "Access meal number"],
    },
  },
  { timestamps: true }
);

export const PurchaseMeal = model<TPurchaseMeal>(
  "purchase-meal",
  purchaseMealSchema
);
