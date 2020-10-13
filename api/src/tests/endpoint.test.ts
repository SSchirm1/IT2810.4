import { Connection, getConnection, getRepository } from "typeorm";
import {
  useRefreshDatabase,
  useSeeding,
  runSeeder,
  tearDownDatabase,
} from "typeorm-seeding";
import * as request from "supertest";
import ByController from "../controllers/by.controller";
import App from "../app";
import CreateByerWithReviews from "../seeds/createByerWithReviews";
import { By } from "../entity/by.entity";
import StudentbyController from "../controllers/studentby.controller";
import ReviewController from "../controllers/review.controller";
import { Studentby } from "../entity/studentby.entity";
import { BoligType, Review } from "../entity/review.entity";

describe("Endpoint tests", () => {
  let byController: ByController;
  let studentbyController: StudentbyController;
  let reviewController: ReviewController;

  let app: App;

  beforeAll(async (done) => {
    await useRefreshDatabase().then(async () => {
      byController = new ByController();
      studentbyController = new StudentbyController();
      reviewController = new ReviewController();
      app = new App([byController, studentbyController, reviewController]);
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

  describe("ByController", () => {
    test("GET /api/byer", async () => {
      await request(app.getServer())
        .get("/api/byer")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => expect(response.body.length).toBe(2));
    });

    test("GET /api/byer/:id([0-9])", async () => {
      await request(app.getServer())
        .get("/api/byer/1/")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
          const by: By = response.body;
          expect({ id: by.id, navn: by.navn }).toStrictEqual({
            id: 1,
            navn: "Oslo",
          });
        });
    });

    test("GET /api/byer/:name([A-Za-z]+)", async () => {
      await request(app.getServer())
        .get("/api/byer/Trondheim/")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
          const by: By = response.body;
          expect({ id: by.id, navn: by.navn }).toStrictEqual({
            id: 2,
            navn: "Trondheim",
          });
        });
    });

    test("POST /api/byer)", async () => {
      await request(app.getServer())
        .post("/api/byer")
        .send({ navn: "Stavanger", bilde: "random", path: "random" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          const by: By = response.body;
          expect({ id: by.id, navn: by.navn }).toStrictEqual({
            id: 3,
            navn: "Stavanger",
          });
        });
    });
  });

  describe("StudentbyController", () => {
    test("GET /api/studentbyer", async () => {
      await request(app.getServer())
        .get("/api/studentbyer")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.studentbyer.length).toBe(10);
          expect(response.body.count).toBe(10);
        });
    });

    test("GET /api/studentbyer/:id([0-9])", async () => {
      await request(app.getServer())
        .get("/api/studentbyer/1/")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
          const studentby: Studentby = response.body;
          expect(studentby.id).toBe(1);
          expect(studentby.by.navn).toBe("Oslo");
        });
    });

    test("GET /api/studentbyer/:name([A-Za-z]+)", async () => {
      const test = await getRepository(Studentby).findOne({ where: { id: 1 } });
      console.log("name: ", test.navn);
      await request(app.getServer())
        .get(`/api/studentbyer/${test.navn}/`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
          const studentby: Studentby = response.body;
          expect({ id: studentby.id, navn: studentby.navn }).toStrictEqual({
            id: 1,
            navn: test.navn,
          });
        });
    });

    test("POST /api/studentbyer)", async () => {
      await request(app.getServer())
        .post("/api/studentbyer")
        .send({
          navn: "Lerkendal",
          utleier: "random",
          bilde: "random",
          vurderingTotal: 3,
          vurderingLokasjon: 3,
          vurderingFellesAreal: 3,
          vurderingTilstand: 3,
          vurderingPris: 3,
          path: "random",
          by: 2,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          const studentby: Studentby = response.body;
          expect({ id: studentby.id, navn: studentby.navn }).toStrictEqual({
            id: 11,
            navn: "Lerkendal",
          });
        });
    });

    test("POST /api/studentbyer/:id([0-9])+/reviews)", async () => {
      await request(app.getServer())
        .post("/api/studentbyer/1/reviews")
        .send({
          tittel: "Lerkendal",
          kommentar: "random",
          aar: 2020,
          antall: 2,
          boligType: BoligType.ENEBOLIG,
          vurderingTotal: 3,
          vurderingLokasjon: 3,
          vurderingFellesAreal: 3,
          vurderingTilstand: 3,
          vurderingPris: 3,
          studentby: 1,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          const review: Review = response.body;
          expect({
            tittel: review.tittel,
            kommentar: review.kommentar,
          }).toStrictEqual({
            tittel: "Lerkendal",
            kommentar: "random",
          });
        });
    });

    test("GET /api/studentbyer/:id([0-9])+/reviews)", async () => {
      await request(app.getServer())
        .get("/api/studentbyer/1/reviews")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.length).toBe(6);
        });
      await request(app.getServer())
        .get("/api/studentbyer/1/reviews?skip=2&take=2")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.reviews.length).toBe(2);
          expect(response.body.count).toBe(6);
        });
    });
  });

  describe("ReviewController", () => {
    test("GET /api/reviews", async () => {
      await request(app.getServer())
        .get("/api/reviews")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => expect(response.body.length).toBe(51));
    });

    test("GET /api/reviews/:id([0-9])", async () => {
      await request(app.getServer())
        .get("/api/reviews/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
          const review: Review = response.body;
          expect(review.id).toBe(1);
        });
    });
  });
});
