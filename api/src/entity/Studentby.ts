import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  OneToMany,
} from "typeorm";
import { By } from "./By";
import { Review } from "./Review";

@Entity()
export class Studentby {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  navn: string;

  @Column({ nullable: true })
  utleier: string;

  @Column({ nullable: true })
  bilde: string;

  @Column({ type: "decimal", nullable: true })
  vurderingTotal: number;

  @Column({ type: "decimal", nullable: true })
  vurderingPris: number;

  @Column({ type: "decimal", nullable: true })
  vurderingLokasjon: number;

  @Column({ type: "decimal", nullable: true })
  vurderingFellesAreal: number;

  @Column({ type: "decimal", nullable: true })
  vurderingTilstand: number;

  @Column({ nullable: true })
  path: string;

  @ManyToOne((type) => By, (by) => by.studentbyer)
  by: By;

  @OneToMany((type) => Review, (review) => review.studentby)
  reviews: Review[];
}
