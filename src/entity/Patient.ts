import { Hospital } from "./Hospital";
import { Psychiatrist } from "./Psychiatrist";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import {
  IsEmail,
  IsString,
  IsPhoneNumber,
  Length,
  IsStrongPassword,
  Min,
  Max,
} from "class-validator";

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  @Length(10)
  address: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsPhoneNumber()
  phoneNumber: string;

  @Column()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  // @Max(15)
  password: string;

  @Column()
  @IsString()
  patientphoto: string;

  @ManyToOne(() => Hospital, (hospital) => hospital.patients)
  hospital: Hospital;

  @ManyToOne(() => Psychiatrist, (psychiatrist) => psychiatrist.patients)
  psychiatrist: Psychiatrist;

  create({ name, address, email, phoneNumber, password, patientphoto }) {
    this.name = name;
    this.address = address;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.patientphoto = patientphoto;
    return this;
  }
}
