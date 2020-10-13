import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { Studentby } from "./studentby.entity";

@Entity()
export class By {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  navn: string;

  @Column({ nullable: true })
  bilde: string;

  @Column({ nullable: true })
  path: string;

  @OneToMany((type) => Studentby, (studentby) => studentby.by)
  studentbyer: Studentby[];
}
