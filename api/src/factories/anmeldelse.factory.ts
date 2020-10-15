import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { Anmeldelse, BoligType } from "../entity/anmeldelse.entity";

define(Anmeldelse, (faker: typeof Faker) => {
  const anmeldelse = new Anmeldelse();
  anmeldelse.aarSlutt = faker.random.number(2021);
  anmeldelse.aarStart = faker.random.number(anmeldelse.aarSlutt);
  anmeldelse.boligtype = faker.random.arrayElement([
    BoligType.DUBLETT,
    BoligType.ENEBOLIG,
    BoligType.KOLLEKTIV,
    BoligType.PARBOLIG,
  ]);
  anmeldelse.vurderingPris = faker.random.number(5);
  anmeldelse.vurderingFellesAreal = faker.random.number(5);
  anmeldelse.vurderingLokasjon = faker.random.number(5);
  anmeldelse.vurderingTilstand = faker.random.number(5);
  anmeldelse.tekst = faker.random.words(50);
  return anmeldelse;

});
