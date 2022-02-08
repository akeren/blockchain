import express, { Request, Response, NextFunction, Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import config from '@src/config/';
import { AppError } from '@src/errors/';
import { globalErrorHandler } from '@src/handlers/globalErrorHandler';
import { Blockchain } from '@src/logic/Blockchain';
import { Block } from '@src/logic/Block';

const app: Express = express();

// set security for HTTP Headers
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (config.app.env === 'development') app.use(morgan('dev'));

app.get('/', (req: Request, res: Response): void => {
  const blockchain = new Blockchain();

  blockchain.addBlock(new Block(1, 1, Date.now(), { amount: 10 }));
  blockchain.addBlock(new Block(2, 2, Date.now(), { amount: 20 }));

  res.status(200).json({
    status: true,
    code: '200',
    data: blockchain,
  });
});

app.all('*', (req: Request, res: Response, next: NextFunction): void => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export { app };
