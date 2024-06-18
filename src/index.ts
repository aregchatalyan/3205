import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { config } from './config';
import { ApiError } from './api/api.error';
import { router } from './api/emails/email.routes';

const app = express();
const PORT = config.get('PORT');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.success = (status, data, message) => {
    return res.status(status).json({ message, data });
  }

  res.failed = (status, message, errors) => {
    return res.status(status).json({ message, errors });
  }

  next();
});

app.use('/api/v1/emails', router);

app.use((err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  if (err && err instanceof ApiError) return res.failed(err.status, err.message, err.errors);

  console.log(err.message);
  res.failed(500, 'Oops! Something went wrong!');
});

app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});
