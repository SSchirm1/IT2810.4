import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { By } from "../entity/By";

define(By, (faker: typeof Faker) => {
  const by = new By();
  by.path = faker.random.words(2);
  by.navn = faker.random.words(2);
  by.bilde = faker.random.words(2);
  return by;
});
