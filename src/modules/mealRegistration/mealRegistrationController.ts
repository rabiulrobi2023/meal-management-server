import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MealRegistrationService } from "./mealRegistration.service";

const createMealRegistration = catchAsync(async (req, res) => {
  const mealRegistrationData = req.body;
  const result = await MealRegistrationService.createMealRegistrationIntoDB(
    mealRegistrationData
  );
  sendResponse(res, {
    message: "Meal registration successfull",
    data: result,
  });
});

const getAllRegisteredMeal = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await MealRegistrationService.getAllRegisteredMealFromDB(
    query
  );
  sendResponse(res, {
    message: "The registered meal was retrieved successfully.",
    data: result,
  });
});

const getRegisteredMealByMonth = catchAsync(async (req, res) => {
  const result = await MealRegistrationService.getRegisteredMealsByMonthFromDB(
    req.body
  );
  sendResponse(res, {
    message: "The registered meal was retrieved successfully.",
    data: result,
  });
});

export const MealRegistrationController = {
  createMealRegistration,
  getAllRegisteredMeal,
  getRegisteredMealByMonth
};
