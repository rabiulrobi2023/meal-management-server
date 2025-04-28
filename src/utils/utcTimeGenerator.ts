import { days } from "./../constant/days";
import { months } from "../constant/months";

export const utcMonth = () => {
  const monthsArray = months;
  const utcMontIndex = new Date().getUTCMonth();
  const result = monthsArray[utcMontIndex];
  return result;
};

export const utcYear = () => {
  return new Date().getUTCFullYear();
};

export const utcDate = () => {
  return new Date().getUTCDate();
};

export const utcDay = () => {
  const daysArray = days;
  const utcMontIndex = new Date().getUTCDay();
  const result = daysArray[utcMontIndex];
  return result;
};
