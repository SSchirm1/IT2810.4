import { Router, Request, Response } from "express";
import { getRepository, FindManyOptions } from "typeorm";
import { Studentby } from "../entity/studentby.entity";
import { Review } from "../entity/review.entity";
import { By } from "../entity/by.entity";

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
    if (req.query.skip && req.query.take) {
      const options: FindManyOptions = {
        relations: ["by"],
        take: Number(req.query.take),
        skip: Number(req.query.skip),
      };
      const [studentbyer, count] = await this.studentbyRepository.findAndCount(
        options
      );
      return res.json({ studentbyer, count });
    }
    const [studentbyer, count] = await this.studentbyRepository.findAndCount();
    return res.json({ studentbyer, count });
  };

  private getStudentbyById = async (req: Request, res: Response) => {
    const results = await this.studentbyRepository.findOne(req.params.id, {
      relations: ["by"],
    });
    res.send(results);
  };

  private getStudentbyByName = async (req: Request, res: Response) => {
    const name: string =
      req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1);
    const studentby = await this.studentbyRepository.findOne({
      where: { navn: name },
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
      const [reviews, count] = await this.reviewRepository.findAndCount(
        options
      );
      return res.json({ reviews, count });
    }
    return res.json(studentby.reviews);
  };

  private createReview = async (req: Request, res: Response) => {
    try {
      const studentby = await this.studentbyRepository.findOne(req.params.id);
      const review = this.reviewRepository.create(req.body);
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
