import { Factory, Seeder } from "typeorm-seeding";
import { Anmeldelse } from "../entity/anmeldelse.entity";
import { By } from "../entity/by.entity";
import { Studentby } from "../entity/studentby.entity";

export default class CreateByerWithAnmeldelser implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const oslo = await factory(By)().create({ navn: "Oslo" });
    const trondheim = await factory(By)().create({ navn: "Trondheim" });

    for (const by of [oslo, trondheim]) {

      const studentbyer = await factory(Studentby)()
      .map(async (studentby) => {
        studentby.by = by;
        return studentby;
      })
      .createMany(5);


      for (const studentby of studentbyer) {
        await factory(Anmeldelse)()
          .map(async (anmeldelse) => {
            anmeldelse.studentby = studentby;
            return anmeldelse;
          })
          .createMany(5);
      }
    }

  }
}
