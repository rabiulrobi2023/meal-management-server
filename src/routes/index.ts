import { Router } from "express";
import { UserRouter } from "../modules/user/user.routes";
import { MemberRotes } from "../modules/member/member.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
