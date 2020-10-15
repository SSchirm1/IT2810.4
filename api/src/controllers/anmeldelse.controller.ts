import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Anmeldelse } from "../entity/anmeldelse.entity";

class AnmeldelseeController {
  public path = "/anmeldelser";
  public router = Router();
  private anmeldelseRepository = getRepository(Anmeldelse);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllReviews);
    this.router.get(`${this.path}/:id([0-9])+`, this.getReviewById);
  }

  private getAllReviews = async (req: Request, res: Response) => {
    const reviews = await this.anmeldelseRepository.find();
    res.json(reviews);
  };

  private getReviewById = async (req: Request, res: Response) => {
    const results = await this.anmeldelseRepository.findOne(req.params.id);
    res.send(results);
  };
}

export default AnmeldelseeController;
