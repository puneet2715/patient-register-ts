import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Hospital, Patient, Psychiatrist } from "./entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "", // e.g. localhost / url of the database server/container
  port: 3306,
  username: "", // e.g. root
  password: "", // e.g. password
  database: "Hospital",
  synchronize: true,
  logging: false,
  entities: [Hospital, Patient, Psychiatrist],
  migrations: [],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
});

export const hospitalRepo = AppDataSource.getRepository(Hospital);
export const patientRepo = AppDataSource.getRepository(Patient);
export const psychiatristRepo = AppDataSource.getRepository(Psychiatrist);
