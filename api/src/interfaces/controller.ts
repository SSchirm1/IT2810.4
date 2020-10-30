import { Router } from "express";

/* Interface for Controller to be used in App */
interface Controller {
  path: string;
  router: Router;
}

export default Controller;
