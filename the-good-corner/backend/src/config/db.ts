import { Category } from "../entities/category";
import { Ad } from "../entities/ad";
import { DataSource } from "typeorm";
import { Tag } from "../entities/tag";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "postgres",
  synchronize: true,
  logging: ["error", "query"],
  entities: [Ad, Category, Tag],
});
