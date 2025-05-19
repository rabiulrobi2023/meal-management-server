export const mealArr = [
  "Breakfast",
  "Lunch",
  "Iftar",
  "Dinner",
  "Sehri",
] as const;
export type mealLiteral = (typeof mealArr)[number];
