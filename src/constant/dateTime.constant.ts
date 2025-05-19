import moment from "moment-timezone";

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const monthArr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;
const BD_TZ = "Asia/Dhaka";

export type monthLiteral = (typeof monthArr)[number];

export const getCurrentBDMonth = (): string => moment().tz(BD_TZ).format("MMM");

export const getCurrentBDYear = (): number =>
  Number(moment().tz(BD_TZ).format("YYYY"));

export const getCurrentBDMonthYear = (): string =>
  moment().tz(BD_TZ).format("MMM-YYYY");

export const getLastMealTakenTime = (date: string, h: number, m: number): Date =>
  moment(date).hour(h).minute(m).toDate();

export const getEndDateOfBDMonth = (date?:string): Date =>{
  if(date){
    return moment(date).endOf("month").toDate();
  }
   return moment().endOf("month").toDate();
}
 

export const getTodayBdDate = (): Date => moment().tz(BD_TZ).startOf("day").toDate();

export const getNowBdDateTime = (): Date => moment.tz(BD_TZ).toDate();

