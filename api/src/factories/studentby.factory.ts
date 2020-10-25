import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { Studentby } from "../entity/studentby.entity";

define(Studentby, (faker: typeof Faker) => {
  const studentby = new Studentby();
  studentby.navn = faker.address.city().replace(" ", "").replace("-", "");
  studentby.utleier = faker.random.words(2);
  return studentby;
});
