import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  OneToMany,
} from "typeorm";
import { By } from "./by.entity";
import { Anmeldelse } from "./anmeldelse.entity";

@Entity()
export class Studentby {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  navn: string;

  @Column({ nullable: true })
  utleier: string;

  @ManyToOne((type) => By, (by) => by.studentbyer)
  by: By;

  @OneToMany((type) => Anmeldelse, (anmeldelse) => anmeldelse.studentby)
  anmeldelser: Anmeldelse[];
}
