import { Category } from "../entities/category";
import { Ad } from "../entities/ad";
import { DataSource } from "typeorm";
import { Tag } from "../entities/tag";
import { User } from "../entities/user";

export const dataSource = new DataSource({
  type: "postgres",
  synchronize: true,
  logging: ["error", "query"],
  entities: [Ad, Category, Tag, User],

  replication: {
    master: {
      host: "db",
      port: 5432,
      username: "postgres",
      password: "my_password",
      database: "postgres",
    },
    slaves: [
      {
        host: "db-replica",
        port: 5432,
        username: "postgres",
        password: "my_password",
        database: "postgres",
      },
    ],
  },
});
