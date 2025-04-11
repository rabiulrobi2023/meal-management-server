import { UserController } from "./user.controller";
import express, { Router } from "express";

const router = Router();
router.post("/create-member", UserController.createMember);

export const UserRouter = router;
