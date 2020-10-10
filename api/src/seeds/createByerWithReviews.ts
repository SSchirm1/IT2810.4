import { Factory, Seeder } from "typeorm-seeding";
import { Review } from "../entity/Review";
import { By } from "../entity/By";
import { Studentby } from "../entity/Studentby";

export default class CreateByerWithReviews implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const oslo = await factory(By)().create({ navn: "Oslo " });
    const trondheim = await factory(By)().create({ navn: "Trondheim " });

    const studentbyerOslo = await factory(Studentby)()
      .map(async (studentby) => {
        studentby.by = oslo;
        return studentby;
      })
      .createMany(5);

    const studentbyerTrondheim = await factory(Studentby)()
      .map(async (studentby) => {
        studentby.by = trondheim;
        return studentby;
      })
      .createMany(5);

    for (const studentby of studentbyerOslo) {
      await factory(Review)()
        .map(async (review) => {
          review.studentby = studentby;
          return review;
        })
        .createMany(5);
    }

    for (const studentby of studentbyerTrondheim) {
      await factory(Review)()
        .map(async (review) => {
          review.studentby = studentby;
          return review;
        })
        .createMany(5);
    }
  }
}
