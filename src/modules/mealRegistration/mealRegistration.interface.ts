import { monthLiteral } from "../../constant/dateTime.constant";
import { mealLiteral } from "../../constant/meal.constant";

export type TMealRegistration = {
  name: mealLiteral;
  value: 0.5 | 1 | 1.5;
  month: monthLiteral;
  year: number;
};
