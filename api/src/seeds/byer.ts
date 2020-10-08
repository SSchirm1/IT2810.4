import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { By } from "../entity/By";

export default class CreateByer implements Seeder {
    public async run(_factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(By)
            .values([
                { navn: "Oslo", bilde: "tododo" },
                { navn: "Trondheim", bilde: "yesss" }
            ])
            .execute();
    }
}
