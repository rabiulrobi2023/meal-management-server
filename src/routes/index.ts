import { Router } from "express";
import { UserRouter } from "../modules/user/user.routes";
import { MemberRotes } from "../modules/member/member.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRouter,
  },
  {
    path: "/member",
    route: MemberRotes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
