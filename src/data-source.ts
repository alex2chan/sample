import "reflect-metadata"
import { DataSource } from "typeorm"
import { Sum } from "./entity/Sum.js"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [Sum],
  migrations: [],
  subscribers: [],
})
