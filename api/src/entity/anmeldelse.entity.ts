import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Studentby } from "./studentby.entity";

@Entity()
export class Anmeldelse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  vurderingPris: number;

  @Column({ nullable: true })
  vurderingLokasjon: number;

  @Column({ nullable: true })
  vurderingFellesAreal: number;

  @Column({ nullable: true })
  vurderingTilstand: number;

  @CreateDateColumn()
  datoPostet: string;

  @ManyToOne((type) => Studentby, (studentby) => studentby.anmeldelser)
  studentby: Studentby;
}
