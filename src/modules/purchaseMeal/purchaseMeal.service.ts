import httpStatus from "http-status";

import { Member } from "../member/member.model";
import { TPurchaseMeal } from "./purchaseMeal.interface";
import { MealRegistration } from "../mealRegistration/mealRegistratiion.model";
import AppError from "../../error/AppError";

import { PurchaseMeal } from "./purchaseMeal.model";
import {
  getCurrentBDMonthYear,
  getEndDateOfBDMonth,
  getLastMealTakenTime,
  getNowBdDateTime,
} from "../../constant/dateTime.constant";

const createPurchaseMealIntoDB = async (payload: TPurchaseMeal) => {
  const member = await Member.findOne({ id: payload.id });

  const isMealAvailable = await MealRegistration.findById(
    payload.registeredMeal
  );

  if (!isMealAvailable) {
    throw new AppError(httpStatus.BAD_REQUEST, "Meal is not available");
  }

  const mealMonthYear: string = `${isMealAvailable?.month}-${isMealAvailable.year}`;
  const currentMealMonthYear = getCurrentBDMonthYear();

  if (mealMonthYear !== currentMealMonthYear) {
    throw new AppError(httpStatus.BAD_REQUEST, "The meal is already closed");
  }

  const mealDateToString = new Date(payload.date).toUTCString();
  const mealTime = getLastMealTakenTime(mealDateToString, 15, 30);

  const nowTime = getNowBdDateTime();

  if (mealTime <= nowTime) {
    throw new AppError(httpStatus.BAD_REQUEST, "Meal time is over");
  }

  const endDateOfCurrentMonth = getEndDateOfBDMonth();
  const endDateOfRequiredMealMonth = getEndDateOfBDMonth(mealDateToString);

  if (endDateOfRequiredMealMonth > endDateOfCurrentMonth) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "The meal for next month is not available"
    );
  }

  const alreadyPurchases = await PurchaseMeal.findOne({
    registeredMeal: payload.registeredMeal,
    id: payload.id,
    date: payload.date,
  });

  if (alreadyPurchases) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already purchased the meal"
    );
  }

  const result = await PurchaseMeal.create({ ...payload, member });
  return result;
};

export const PurchaseMealService = {
  createPurchaseMealIntoDB,
};
