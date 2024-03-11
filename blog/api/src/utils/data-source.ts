import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "../model/user.model";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "super",
    database: "fiji-boys",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
});
