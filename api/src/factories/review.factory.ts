import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { Review, BoligType } from "../entity/review.entity";

define(Review, (faker: typeof Faker) => {
  const review = new Review();
  review.aar = faker.random.number(2021);
  review.boligtype = faker.random.arrayElement([
    BoligType.DUBLETT,
    BoligType.ENEBOLIG,
    BoligType.KOLLEKTIV,
    BoligType.PARBOLIG,
  ]);
  review.vurderingFellesAreal = faker.random.number(5);
  review.vurderingLokasjon = faker.random.number(5);
  review.vurderingPris = faker.random.number(5);
  review.vurderingTilstand = faker.random.number(5);
  review.antall = faker.random.number(6);
  review.tittel = faker.random.words(10);
  review.kommentar = faker.random.words(50);
  return review;
});
