import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { By } from "../entity/by.entity";

define(By, (faker: typeof Faker) => {
  const by = new By();
  by.path = faker.random.words(1);
  by.navn = faker.address.city().replace(" ", "").replace("-", "");
  by.bilde = faker.random.words(2);
  return by;
});
