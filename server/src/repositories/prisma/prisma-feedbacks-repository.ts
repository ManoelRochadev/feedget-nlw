import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({type, comment, screenshot}: FeedbackCreateData) {
    if (screenshot == undefined || screenshot == null) {
      await prisma.feedback.create({
        data: {
          type,
          comment,
          screenshot: ''
        }
      })
    } else {

      await prisma.feedback.create({
        data: {
          type,
          comment,
          screenshot
        }
      })
    }
  };
}