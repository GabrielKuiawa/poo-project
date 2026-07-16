import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import Image from "./models/Image";
import Category from "./models/Category";
import { config } from "./config";
import { InitialSchema1720760000000 } from "./migration/1720760000000-InitialSchema";
import { NormalizeConstraintNames1720760000001 } from "./migration/1720760000001-NormalizeConstraintNames";
import { CascadeCategoryImages1720760000002 } from "./migration/1720760000002-CascadeCategoryImages";

export const AppDataSource = new DataSource({
  type: "mysql",
  url: config.database.url,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  ssl: config.database.ssl ? { rejectUnauthorized: false } : undefined,
  synchronize: false,
  logging: false,
  entities: [User, Image, Category],
  migrations: [
    InitialSchema1720760000000,
    NormalizeConstraintNames1720760000001,
    CascadeCategoryImages1720760000002,
  ],
  subscribers: [],
});
