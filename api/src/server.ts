import App from "./app";
import ByController from "./controllers/By";
import ReviewController from "./controllers/Review";
import StudentbyController from "./controllers/Studentby";
import { createConnection } from "typeorm";

createConnection().then(async () => {
  const app = new App([
    new ByController(),
    new ReviewController(),
    new StudentbyController(),
  ]);

  app.listen();
});
