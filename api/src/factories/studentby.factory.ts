import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { Studentby } from "../entity/Studentby";

define(Studentby, (faker: typeof Faker) => {
  const studentby = new Studentby();
  studentby.navn = faker.random.words(2);
  studentby.path = faker.random.words(2);
  studentby.bilde = faker.random.words(2);
  studentby.utleier = faker.random.words(2);
  return studentby;
});
