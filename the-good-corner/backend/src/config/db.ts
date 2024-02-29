import { Ad } from "../entities/ad";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  synchronize: true,
  logging: ["error", "query"],
  entities: [Ad],
});
