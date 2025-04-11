import express, { Application, Request, Response } from "express";
import cors from "cors";

import router from "./routes";
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFoundRoute from "./middleware/notFoundRoute";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Meal management server is running...");
});

app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;
