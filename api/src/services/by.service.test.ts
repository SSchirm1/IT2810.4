import { Connection, getConnection } from "typeorm";
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
  let byService: ByService;

  beforeAll(async (done) => {
    connection = await useRefreshDatabase();
    byService = new ByService();
    await useSeeding();
    await runSeeder(CreateByer);
    done();
  });

  afterAll(async (done) => {
    await connection.createQueryRunner().clearDatabase("test");
    await tearDownDatabase();
    done();
  });

  test("Should exist 2 byer", async () => {
    await byService.getAllByer().then((data) => expect(data.length).toBe(2));
  });
});
