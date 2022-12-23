import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Patient } from "./Patient";
import { Psychiatrist } from "./Psychiatrist";

@Entity()
export class Hospital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Patient, (patient) => patient.hospital)
  patients: Patient[];

  @OneToMany(() => Psychiatrist, (psychiatrist) => psychiatrist.hospital)
  psychiatrists: Psychiatrist[];
}
