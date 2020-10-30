import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { By } from "../entity/by.entity";

/* Factory for a new by, generates name randomly */
define(By, (faker: typeof Faker) => {
  const by = new By();
  by.navn = faker.address.city().replace(" ", "").replace("-", "");
  return by;
});
