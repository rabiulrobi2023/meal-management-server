import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PurchaseMealService } from "./purchaseMeal.service";

const createPurchaseMeal = catchAsync(async (req, res) => {
const purschaseMealData = req.body
purschaseMealData.date = new Date(purschaseMealData.date)
  const result = await PurchaseMealService.createPurchaseMealIntoDB(purschaseMealData);
  sendResponse(res, {
    message: `Your meal order has been placed successfully`,
    data: result,
  });
});

export const PurchaseMealController = {
  createPurchaseMeal,
};
