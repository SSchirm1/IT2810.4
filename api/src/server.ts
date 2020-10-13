import App from "./app";
import ByController from "./controllers/by.controller";
import ReviewController from "./controllers/review.controller";
import StudentbyController from "./controllers/studentby.controller";
import { createConnection } from "typeorm";

createConnection().then(async () => {
  const app = new App([
    new ByController(),
    new ReviewController(),
    new StudentbyController(),
  ]);

  app.listen();
});
