import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../api.error';
import { EmailService } from './email.service';

export class EmailController {
  static async getEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, number } = req.query;

      const data = await EmailService.getEmail(<string>email, <string>number);
      if (!data.length) throw ApiError.NotFound('Nothing found.');

      setTimeout(() => res.success(200, data), 5000);
    } catch (e) {
      next(e);
    }
  }
}
