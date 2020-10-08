import App from "./app";
import ByController from "./controllers/by";
import ReviewController from "./controllers/review";
import StudentbyController from "./controllers/studentby";
import { createConnection } from "typeorm";

createConnection().then(async () => {
  const app = new App([
    new ByController(),
    new ReviewController(),
    new StudentbyController(),
  ]);

  app.listen();
});
