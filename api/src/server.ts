import App from "./app";
import ByController from "./controllers/by.controller";
import AnmeldelseController from "./controllers/anmeldelse.controller";
import StudentbyController from "./controllers/studentby.controller";
import { createConnection } from "typeorm";

createConnection().then(async () => {
  const app = new App([
    new ByController(),
    new AnmeldelseController(),
    new StudentbyController(),
  ]);

  app.listen();
});
