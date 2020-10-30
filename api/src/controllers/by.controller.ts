import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { By } from "../entity/by.entity";

/* Controller used for endpoints related to /byer */
class ByController {
  public path = "/byer";
  public router = Router();
  private byRepository = getRepository(By);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllByer);
    this.router.get(`${this.path}/:id([0-9])+`, this.getByById);
    this.router.get(`${this.path}/:name([A-Za-z]+)`, this.getByByName);
    this.router.post(this.path, this.createBy);
  }

  /* Returns all byer */
  private getAllByer = async (request: Request, res: Response) => {
    const byer = await getRepository(By).find({ relations: ["studentbyer"] });
    res.json(byer);
  };

  /* Returns anmeldelse matching id */
  private getByById = async (req: Request, res: Response) => {
    const results = await this.byRepository.findOne(req.params.id, {
      relations: ["studentbyer"],
    });
    return res.send(results);
  };

  /* Returns anmeldelse matching id */
  private getByByName = async (req: Request, res: Response) => {
    const name: string =
      req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1);

    const results = await this.byRepository.findOne({
      where: { navn: name },
      relations: ["studentbyer"],
    });
    return res.send(results);
  };

  /* Creates new by */
  private createBy = async (req: Request, res: Response) => {
    try {
      const by = this.byRepository.create(req.body);
      const results = await this.byRepository.save(by);
      res.send(results);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  };
}

export default ByController;
