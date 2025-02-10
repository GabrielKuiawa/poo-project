import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/User"
import Image from "./models/Image"
import Category from "./models/Category"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "mysql-container",
    port: 3306,
    username: "user",
    password: "root",
    database: "teste3",
    synchronize: true,
    logging: false,
    entities: [User,Image,Category],
    migrations: [],
    subscribers: [],
})
