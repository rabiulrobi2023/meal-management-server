import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { MealRegistration } from "./mealRegistratiion.model";
import { TMealRegistration } from "./mealRegistration.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFieldOfRegisteredMeal } from "./mealRegistration.constant";
import {
  getCurrentBDMonth,
  getCurrentBDYear,
} from "../../constant/dateTime.constant";

const createMealRegistrationIntoDB = async (payload: TMealRegistration) => {
  const currentMonth: string = getCurrentBDMonth();
  const currentYear: number = getCurrentBDYear();
  const isRegistrationExist = await MealRegistration.findOne({
    name: payload.name,
    month: currentMonth,
    year: currentYear,
  });

  if (isRegistrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      `The meal already registered for this month`
    );
  }

  const result = await MealRegistration.create({
    ...payload,
    month: currentMonth,
    year: currentYear,
  });
  return result;
};

const getAllRegisteredMealFromDB = async (query: Record<string, unknown>) => {
  const registeredMeal = new QueryBuilder(MealRegistration.find(), query)
    .search(searchableFieldOfRegisteredMeal)
    .filter()
    .sort()
    .fields()
    .limit()
    .paginate();
  const result = registeredMeal.queryModel;
  return result;
};

const getRegisteredMealsByMonthFromDB = async (payload: {
  month: string;
  year: string;
}) => {
  const result = await MealRegistration.find({
    month: payload.month,
    year: payload.year,
  });

  if (result?.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "There is no any registered meal");
  }
  return result;
};
export const MealRegistrationService = {
  createMealRegistrationIntoDB,
  getAllRegisteredMealFromDB,
  getRegisteredMealsByMonthFromDB,
};
