import { Connection } from "typeorm";
import {
  useRefreshDatabase,
  useSeeding,
  factory,
  runSeeder,
  tearDownDatabase,
} from "typeorm-seeding";
import CreateByer from "../seeds/byer";
import ByService from "./by";

describe("ByService", () => {
  let connection: Connection;

  beforeAll(async (done) => {
    connection = await useRefreshDatabase({ connection: "memory" });
    await useSeeding();
    await runSeeder(CreateByer);
    done();
  });

  afterAll(async (done) => {
    await tearDownDatabase();
    done();
  });

  test("Should exist 2 byer", () => {});
});
