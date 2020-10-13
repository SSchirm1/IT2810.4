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
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  tittel: string;

  @Column({ type: "varchar", length: 1000, nullable: true })
  kommentar: string;

  @Column({ nullable: true })
  aar: number;

  @Column({ nullable: true })
  antall: number;

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
  postedAt: string;

  @ManyToOne((type) => Studentby, (studentby) => studentby.reviews)
  studentby: Studentby;
}
