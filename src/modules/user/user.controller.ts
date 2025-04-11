import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import AppError from "../../error/AppError";

const createMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pass = req?.body?.password;
    const payload = req.body?.student;
    console.log(req.body);
    const result = await UserService.createMemberIntoDB(pass, payload);
    res.status(200).json({
      success: true,
      message: "A request for create as meal member has sent successfull",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const UserController = {
  createMember,
};
