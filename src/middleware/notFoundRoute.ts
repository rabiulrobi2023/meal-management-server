import { NextFunction, Request, RequestHandler, Response } from "express";

const notFoundRoute: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: false,
    message: "API not found",
  });
};
export default notFoundRoute;
