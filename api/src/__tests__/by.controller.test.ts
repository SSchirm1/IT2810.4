import { Connection, getConnection } from "typeorm";
import {
  useRefreshDatabase,
  useSeeding,
  runSeeder,
  tearDownDatabase,
} from "typeorm-seeding";
import * as request from "supertest";
import ByController from "../controllers/By";
import App from "../app";
import CreateByerWithReviews from "../seeds/createByerWithReviews";

describe("ByController", () => {
  let connection: Connection | void;
  let byController: ByController;
  let app: App;

  beforeAll(async (done) => {
    connection = await useRefreshDatabase().then(async () => {
      byController = new ByController();
      app = new App([byController]);
    });
    await useSeeding();
    await runSeeder(CreateByerWithReviews);
    done();
  });

  afterAll(async (done) => {
    await getConnection().createQueryRunner().clearDatabase("test");
    await tearDownDatabase();
    done();
  });

  test("Should exist 2 byer", async () => {
    await request(app.getServer())
      .get("/api/byer")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => expect(response.body.length).toBe(2));
  });

  test("GET /api/byer", async () => {
    await request(app.getServer())
      .get("/api/byer")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
