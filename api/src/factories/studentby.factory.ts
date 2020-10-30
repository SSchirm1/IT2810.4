import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { Studentby } from "../entity/studentby.entity";

/* Factory for a new studentby, generates navn and utleier randomly */
define(Studentby, (faker: typeof Faker) => {
  const studentby = new Studentby();
  studentby.navn = faker.address.city().replace(" ", "").replace("-", "");
  studentby.utleier = faker.random.words(2);
  return studentby;
});
