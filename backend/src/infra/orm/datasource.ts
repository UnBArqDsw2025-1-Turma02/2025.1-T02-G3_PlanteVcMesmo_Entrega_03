import { DataSource } from "typeorm";
import env from "@/env";
import logger from "@/infra/logger";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: env.DB_PORT,
  url: env.POSTGRES_URL
})

export async function dbConnection() {
  try {
    await dataSource.initialize();
    logger.info("✅ Database connected");
  } catch (error) {
    logger.error("Error on connecting to database", error);
    throw new Error("Error on connecting to database");
  }
}