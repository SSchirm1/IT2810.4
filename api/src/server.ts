import App from "./app";
import ByController from "./controllers/by.controller";
import AnmeldelseController from "./controllers/anmeldelse.controller";
import StudentbyController from "./controllers/studentby.controller";
import { createConnection } from "typeorm";

/* Starts up the server by getting connection with the database and then starting the app with our controllers */
createConnection().then(async () => {
  const app = new App([
    new ByController(),
    new AnmeldelseController(),
    new StudentbyController(),
  ]);

  app.listen();
});
