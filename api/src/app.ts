import * as express from "express";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import Controller from "./interfaces/controller";

var cors = require("cors");

/* The Express Application with some useful methods */
class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  public listen() {
    this.app.listen(process.env.PORT ?? 8000, () => {
      console.log(`App listening on the port ${process.env.PORT ?? 8000}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json()); // Add support for JSON
    this.app.use(cors()); // Add support for CORS
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router); // Sets the base path as /api
    });
  }
}

export default App;
