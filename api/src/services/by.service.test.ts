import { Connection, createConnection, getConnection } from "typeorm";
import {
  useRefreshDatabase,
  useSeeding,
  factory,
  runSeeder,
  tearDownDatabase,
} from "typeorm-seeding";
import CreateByer from "../seeds/byer";
import ByService from "./by";
import * as request from "supertest";
import ByController from "../controllers/by";
import App from "../app";
import { doesNotMatch } from "assert";

describe("ByController", () => {
  let connection: Connection | void;
  let byService: ByService;
  let byController: ByController;
  let app: App;

  beforeAll(async (done) => {
    connection = await useRefreshDatabase().then(async () => {
      byController = new ByController();
      app = new App([byController]);
    });
    await useSeeding();
    await runSeeder(CreateByer);
    done();
  });

  afterAll(async (done) => {
    await getConnection().createQueryRunner().clearDatabase("test");
    await tearDownDatabase();
    done();
  });

  test("Should exist 2 byer", async () => {
    await byController.byService
      .getAllByer()
      .then((data) => expect(data.length).toBe(2));
  });

  test("GET /api/byer", async () => {
    await request(app.getServer())
      .get("/api/byer")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
