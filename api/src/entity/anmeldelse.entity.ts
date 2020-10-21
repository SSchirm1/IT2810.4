import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Studentby } from "./studentby.entity";

export enum BoligType {
  PARBOLIG = "parbolig",
  ENEBOLIG = "enebolig",
  DUBLETT = "dublett",
  KOLLEKTIV = "kollektiv",
}

@Entity()
export class Anmeldelse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 1000, nullable: true })
  tekst: string;

  @Column({ nullable: true })
  aarStart: number;

  @Column({ nullable: true })
  aarSlutt: number;

  @Column({ nullable: true })
  vurderingPris: number;

  @Column({ nullable: true })
  vurderingLokasjon: number;

  @Column({ nullable: true })
  vurderingFellesAreal: number;

  @Column({ nullable: true })
  vurderingTilstand: number;

  @Column({ type: "enum", enum: BoligType, default: BoligType.KOLLEKTIV })
  boligtype: BoligType;

  @CreateDateColumn()
  datoPostet: string;

  @ManyToOne((type) => Studentby, (studentby) => studentby.anmeldelser)
  studentby: Studentby;
}
