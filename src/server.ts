/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Server } from "http";
import config from "./config";
import mongoose from "mongoose";
import app from "./app";

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    server = app.listen(config.PORT, () => {
      console.log(`Meal management server running on port: ${config.PORT}`);
    });
  } catch (err) {
    console.log("Server error: ", err);
  }
}

main();
