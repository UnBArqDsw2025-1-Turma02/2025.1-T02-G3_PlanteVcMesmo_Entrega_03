import env from "@/env";
import express from "express";
import logger from "@/infra/logger";
import { Request, Response } from "express";
import { dbConnection } from "@/infra/orm/datasource";

const app = express();
const port = env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "API Runing" })
});

async function server() {
  try {
    logger.info("⏳ Initializing database...");
    await dbConnection();
    app.listen(port);
  } catch (error) {
    logger.error("Error on starting server", error);
  }
}

server()
  .then(() => {
    logger.info(`🚀 Server is running on http://localhost:${port}`);
  })
  .catch((error) => {
    logger.error("Error on starting server", error);
  });