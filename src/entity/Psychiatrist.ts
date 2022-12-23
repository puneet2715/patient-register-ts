import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Hospital } from "./Hospital";
import { Patient } from "./Patient";

@Entity()
export class Psychiatrist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Hospital, (hospital) => hospital.patients)
  hospital: Hospital;

  @OneToMany(() => Patient, (patient) => patient.psychiatrist)
  patients: Patient[];
}
