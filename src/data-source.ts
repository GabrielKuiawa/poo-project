import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/User"
import Image from "./models/Image"
import Category from "./models/Category"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User,Image,Category],
    migrations: [],
    subscribers: [],
})
