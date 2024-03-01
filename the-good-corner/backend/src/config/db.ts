import { Category } from "../entities/category";
import { Ad } from "../entities/ad";
import { DataSource } from "typeorm";
import { Tag } from "../entities/tag";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  synchronize: true,
  logging: ["error", "query"],
  entities: [Ad, Category, Tag],
});
