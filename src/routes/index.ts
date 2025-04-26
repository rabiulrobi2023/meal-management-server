import { Router } from "express";
import { UserRouter } from "../modules/user/user.routes";
import { MemberRotes } from "../modules/member/member.routes";
import { AdminRouter } from "../modules/admin/admin.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
