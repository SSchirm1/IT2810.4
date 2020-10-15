import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  OneToMany,
} from "typeorm";
import { City } from "./city.entity";
import { Review } from "./anmeldelse.entity";

@Entity()
export class Studentcity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  landlord: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: "decimal", nullable: true })
  scoreTotal: number;

  @Column({ type: "decimal", nullable: true })
  scorePrice: number;

  @Column({ type: "decimal", nullable: true })
  scoreLocation: number;

  @Column({ type: "decimal", nullable: true })
  scoreCommonArea: number;

  @Column({ type: "decimal", nullable: true })
  scoreCondition: number;

  @ManyToOne((type) => City, (city: City) => city.studentcities)
  city: City;

  @OneToMany((type) => Review, (review: Review) => review.studentcity)
  reviews: Review[];
}
