import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Review } from "../entity/review.entity";

class ReviewController {
  public path = "/reviews";
  public router = Router();
  private reviewRepository = getRepository(Review);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllReviews);
    this.router.get(`${this.path}/:id([0-9])+`, this.getReviewById);
  }

  private getAllReviews = async (req: Request, res: Response) => {
    const reviews = await this.reviewRepository.find();
    res.json(reviews);
  };

  private getReviewById = async (req: Request, res: Response) => {
    const results = await this.reviewRepository.findOne(req.params.id);
    res.send(results);
  };
}

export default ReviewController;
