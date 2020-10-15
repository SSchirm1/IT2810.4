import { Router, Request, Response } from "express";
import { getRepository, FindManyOptions } from "typeorm";
import { studentcity } from "../entity/studentcity.entity";
import { Review } from "../entity/anmeldelse.entity";
import { City } from "../entity/city.entity";

class studentcityController {
  public path = "/studentcities";
  public router = Router();
  private studentcityRepository = getRepository(studentcity);
  private reviewRepository = getRepository(Review);
  private cityRepository = getRepository(City);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllStudentCities);
    this.router.get(`${this.path}/:id([0-9])+`, this.getstudentcityById);
    this.router.get(`${this.path}/:name([A-Za-z]+)`, this.getstudentcityByName);
    this.router.get(
      `${this.path}/:id([0-9])+/reviews`,
      this.getstudentcityReviews
    );
    this.router.post(`${this.path}/:id([0-9])+/reviews`, this.createReview);
    this.router.post(this.path, this.createstudentcity);
  }

  private getAllStudentCities = async (req: Request, res: Response) => {
    if (req.query.skip && req.query.take) {
      const options: FindManyOptions = {
        relations: ["city"],
        take: Number(req.query.take),
        skip: Number(req.query.skip),
      };
      const [studentCities, count] = await this.studentcityRepository.findAndCount(
        options
      );
      return res.json({ studentCities, count });
    }
    const [studentCities, count] = await this.studentcityRepository.findAndCount();
    return res.json({ studentCities, count });
  };

  // Maybe this is where we return average rating, number of ratings etc...
  // At the first fetch, get this + 5 reviews. Only send one request the first time?
  // But maybe its not worth the trouble, its only 1 extra http request
  private getstudentcityById = async (req: Request, res: Response) => {
    const results = await this.studentcityRepository.findOne(req.params.id, {
      relations: ["city"],
    });
    res.json(results);
  };

  private getstudentcityByName = async (req: Request, res: Response) => {
    const name: string =
      req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1);

    const studentcity = await this.studentcityRepository.findOne({
      where: { name: name },
      relations: ["city"],
    });
    return res.json(studentcity);
  };

  private getstudentcityReviews = async (req: Request, res: Response) => {
    const studentcity = await this.studentcityRepository.findOne(req.params.id, {
      relations: ["reviews"],
    });

    if (req.query.skip && req.query.take) {
      const options: FindManyOptions = {
        where: {
          studentcity,
        },
        take: Number(req.query.take),
        skip: Number(req.query.skip),
      };
      const results = await this.reviewRepository.findAndCount(options);
      return res.json(results);
    }
    return res.json(studentcity.reviews);
  };

  private createReview = async (req: Request, res: Response) => {
    try {
      const studentcity = await this.studentcityRepository.findOne(req.params.id);
      const review = await this.reviewRepository.create(req.body);
      const new_review = { ...review, studentcity };
      const results = await this.reviewRepository.save(new_review);
      res.json(results);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  };

  private createstudentcity = async (req: Request, res: Response) => {
    try {
      const studentcity = this.studentcityRepository.create(req.body);
      const city = await this.cityRepository.findOne(req.body.byId);
      const new_studentby = { ...studentcity, city };
      const results = await this.studentcityRepository.save(new_studentby);
      res.send(results);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  };
}

export default studentcityController;
