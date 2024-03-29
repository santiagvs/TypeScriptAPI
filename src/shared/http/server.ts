import AppError from '@shared/errors/AppError';
import cors from 'cors';
import { errors } from 'celebrate';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import routes from './routes';
import '@shared/typeorm';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      messsage: 'Internal Server Error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server listening on port 3333');
});
