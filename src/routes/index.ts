import { Router } from "express";
import { UserRouter } from "../modules/user/user.routes";
import { MemberRotes } from "../modules/member/member.routes";
import { AdminRouter } from "../modules/admin/admin.routes";
import { ManagerRouter } from "../modules/manager/manager.routes";
import { MealRegistrationRoutes } from "../modules/mealRegistration/mealRegistration.routes";
import { PurchaseMealRouter } from "../modules/purchaseMeal/purchaseMeal.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/member",
    route: MemberRotes,
  },
  {
    path: "/user",
    route: UserRouter,
  },
  {
    path: "/user",
    route: UserRouter,
  },
  {
    path: "/admin",
    route: AdminRouter,
  },
  {
    path: "/manager",
    route: ManagerRouter,
  },
  {
    path: "/meal-registration",
    route: MealRegistrationRoutes,
  },
  {
    path: "/purchase-meal",
    route: PurchaseMealRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
