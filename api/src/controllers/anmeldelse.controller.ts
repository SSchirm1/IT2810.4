import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Anmeldelse } from "../entity/anmeldelse.entity";

/* Controller used for endpoints related to /anmeldelser */
class AnmeldelseController {
  public path = "/anmeldelser";
  public router = Router();
  private anmeldelseRepository = getRepository(Anmeldelse);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllAnmeldelser);
    this.router.get(`${this.path}/:id([0-9]+)`, this.getAnmeldelseById);
  }
  /* Returns all anmeldelser */
  private getAllAnmeldelser = async (req: Request, res: Response) => {
    const results = await this.anmeldelseRepository.find();
    res.json(results);
  };

  /* Returns anmeldelse matching id */
  private getAnmeldelseById = async (req: Request, res: Response) => {
    const results = await this.anmeldelseRepository.findOne(req.params.id);
    res.send(results);
  };
}

export default AnmeldelseController;
