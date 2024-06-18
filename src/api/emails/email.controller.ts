import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../api.error';
import { delay } from '../../utils/delay';
import { EmailService } from './email.service';


export class EmailController {
  static async getEmail(req: Request, res: Response, next: NextFunction) {
    try {
      await delay(5000);

      const { email, number } = req.query;

      const data = await EmailService.getEmail(<string> email, <string> number);
      if (!data.length) throw ApiError.NotFound('Nothing found.');

      res.success(200, data);
    } catch (e) {
      next(e);
    }
  }
}
