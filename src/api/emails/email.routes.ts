import { Router } from 'express';
import { EmailController } from './email.controller';
import { getEmail } from './email.pipes';
import { pipeMiddleWare } from '../../middlewares/pipe.middleware';

export const router = Router();

router.get('/',
  pipeMiddleWare(getEmail),
  EmailController.getEmail
);
