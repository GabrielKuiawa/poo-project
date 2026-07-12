import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import Image from "./models/Image";
import Category from "./models/Category";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Image, Category],
  migrations: [],
  subscribers: [],
});
