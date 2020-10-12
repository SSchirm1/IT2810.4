import { Router, Request, Response } from "express";
import { getRepository, FindManyOptions } from "typeorm";
import { Studentby } from "../entity/Studentby";
import { Review } from "../entity/Review";
import { By } from "../entity/By";

class StudentbyController {
  public path = "/studentbyer";
  public router = Router();
  private studentbyRepository = getRepository(Studentby);
  private reviewRepository = getRepository(Review);
  private byRepository = getRepository(By);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllStudentbyer);
    this.router.get(`${this.path}/:id([0-9])+`, this.getStudentbyById);
    this.router.get(`${this.path}/:name([A-Za-z]+)`, this.getStudentbyByName);
    this.router.get(
      `${this.path}/:id([0-9])+/reviews`,
      this.getStudentbyReviews
    );
    this.router.post(`${this.path}/:id([0-9])+/reviews`, this.createReview);
    this.router.post(this.path, this.createStudentby);
  }

  private getAllStudentbyer = async (req: Request, res: Response) => {
    const studentbyer = await this.studentbyRepository.find({
      relations: ["by"],
    });
    res.json(studentbyer);
  };

  // Maybe this is where we return average rating, number of ratings etc...
  // At the first fetch, get this + 5 reviews. Only send one request the first time?
  // But maybe its not worth the trouble, its only 1 extra http request
  private getStudentbyById = async (req: Request, res: Response) => {
    const results = await this.studentbyRepository.findOne(req.params.id, {
      relations: ["by"],
    });
    res.send(results);
  };

  private getStudentbyByName = async (req: Request, res: Response) => {
    const studentby = await this.studentbyRepository.findOne({
      where: { path: req.params.name },
      relations: ["by"],
    });
    return res.json(studentby);
  };

  private getStudentbyReviews = async (req: Request, res: Response) => {
    const studentby = await this.studentbyRepository.findOne(req.params.id, {
      relations: ["reviews"],
    });

    if (req.query.skip && req.query.take) {
      const options: FindManyOptions = {
        relations: ["studentby"],
        where: {
          studentby,
        },
        take: Number(req.query.take),
        skip: Number(req.query.skip),
      };
      const reviews = await this.reviewRepository.find(options);
      return res.json(reviews);
    }
    return res.json(studentby.reviews);
  };

  private createReview = async (req: Request, res: Response) => {
    try {
      const studentby = await this.studentbyRepository.findOne(req.params.id);
      const review = await this.reviewRepository.create(req.body);
      const new_review = { ...review, studentby };
      const results = await this.reviewRepository.save(new_review);
      res.json(results);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  };

  private createStudentby = async (req: Request, res: Response) => {
    try {
      const studentbyRepository = this.studentbyRepository;
      const studentby = studentbyRepository.create(req.body);
      const by = await this.byRepository.findOne(req.body.byId);
      const new_studentby = { ...studentby, by };
      const results = await studentbyRepository.save(new_studentby);
      res.send(results);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  };
}

export default StudentbyController;
