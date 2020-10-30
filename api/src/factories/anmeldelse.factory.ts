import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { Anmeldelse } from "../entity/anmeldelse.entity";

/* Factory for a new anmeldelse, generates vurderinger randomly */
define(Anmeldelse, (faker: typeof Faker) => {
  const anmeldelse = new Anmeldelse();
  anmeldelse.vurderingPris = faker.random.number(5);
  anmeldelse.vurderingFellesAreal = faker.random.number(5);
  anmeldelse.vurderingLokasjon = faker.random.number(5);
  anmeldelse.vurderingTilstand = faker.random.number(5);
  return anmeldelse;
});
