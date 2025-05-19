import { model, Schema } from "mongoose";
import { TMealRegistration } from "./mealRegistration.interface";
import { monthArr } from "../../constant/dateTime.constant";
import { mealArr } from "../../constant/meal.constant";

const mealRegistrationSchema = new Schema<TMealRegistration>(
  {
    name: {
      type: String,
      enum: mealArr,
      required: [true, "Meal name is required"],
    },
    value: {
      type: Number,
      enum: [0.5, 1, 1.5,],
      required: [true, "Meal value is reqired"],
    },
    month: {
      type: String,
      enum: monthArr,
      required: [true, "Month is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const MealRegistration = model<TMealRegistration>(
  "meal-registration",
  mealRegistrationSchema
);
