import { Router, Request, Response, query } from "express";
import { getRepository, FindManyOptions, Like, Raw } from "typeorm";
import { Studentby } from "../entity/studentby.entity";
import { Anmeldelse } from "../entity/anmeldelse.entity";
import { By } from "../entity/by.entity";
import { ORDER_MAP } from "./constants";
import * as _ from 'lodash';

class StudentbyController {
  public path = "/studentbyer";
  public router = Router();
  private studentbyRepository = getRepository(Studentby);
  private anmeldelseRepository = getRepository(Anmeldelse);
  private byRepository = getRepository(By);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllStudentbyer);
    this.router.get(`${this.path}/:id([0-9])+`, this.getStudentbyById);
    this.router.get(`${this.path}/:name([A-Za-z]+)`, this.getStudentbyByName);
    this.router.get(
      `${this.path}/:id([0-9])+/anmeldelser`,
      this.getStudentbyReviews
    );
    this.router.post(`${this.path}/:id([0-9])+/anmeldelser`, this.createReview);
    this.router.post(this.path, this.createStudentby);
  }

  private getAllStudentbyer = async (req: Request, res: Response) => {
    const querystring = req.query.querystring ? String(req.query.querystring) : "";
    const sort = req.query.sort ? String(req.query.sort) : "";
    const byfilter = req.query.filter ? Number(req.query.filter) : undefined;
    if (req.query.skip && req.query.take) {
      const options: FindManyOptions<Studentby> = {
        relations: ["by", "anmeldelser"],
        take: Number(req.query.take),
        skip: Number(req.query.skip),
      };
      let finalOptions: FindManyOptions<Studentby>;
      if (byfilter) {
        finalOptions = {...options, where: { navn: Raw(alias => `${alias} ILIKE '%${querystring}%'`), by: byfilter }};
      } else {
        finalOptions = {...options, where: { navn: Raw(alias => `${alias} ILIKE '%${querystring}%'`)}};
      };

      if (sort) {
        finalOptions = {...finalOptions, order: ORDER_MAP[sort]};
      };
      const [studentbyer, count] = await this.studentbyRepository.findAndCount(finalOptions);
      const studentbyerWithCount = studentbyer.map((studentby) => {
        const anmeldelserCount = studentby.anmeldelser.length;
        const studentbyWithCount = { ...studentby, anmeldelserCount };
        const studentbyWithoutAnmeldelser = _.omit(studentbyWithCount, "anmeldelser");
        return studentbyWithoutAnmeldelser;
      })

      return res.json({ studentbyerWithCount, count });
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
      relations: ["anmeldelser"],
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
      const [reviews, count] = await this.anmeldelseRepository.findAndCount(
        options
      );
      return res.json({ reviews, count });
    }
    return res.json(studentby.anmeldelser);
  };

  private createReview = async (req: Request, res: Response) => {
    try {
      const studentby = await this.studentbyRepository.findOne(req.params.id);
      const review = this.anmeldelseRepository.create(req.body);
      const new_review = { ...review, studentby };
      const results = await this.anmeldelseRepository.save(new_review);
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
