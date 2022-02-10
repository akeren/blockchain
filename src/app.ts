import express, { Request, Response, NextFunction, Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import config from '@src/config/';
import { AppError } from '@src/errors/';
import { globalErrorHandler } from '@src/handlers/globalErrorHandler';
import { Blockchain } from '@src/logic/Blockchain';
import { Transaction } from '@src/logic/Transaction';

const app: Express = express();

// set security for HTTP Headers
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (config.app.env === 'development') app.use(morgan('dev'));

app.get('/', (req: Request, res: Response): void => {
  const blockchain = new Blockchain();

  blockchain.addTransaction(new Transaction('address1', 1000, 'address2'));
  blockchain.addTransaction(new Transaction('address2', 500, 'address1'));

  console.log(`Miner started!`);
  blockchain.minePendingTransactions('monique-address');
  console.log(`Miner finished!`);

  console.log(`Monique balance: ${blockchain.getBalanceOfAddress('monique-address')}`);

  console.log(`Miner started!`);
  blockchain.minePendingTransactions('monique-address');
  console.log(`Miner finished!`);

  console.log(`Monique balance: ${blockchain.getBalanceOfAddress('monique-address')}`);

  res.status(200).json({
    status: true,
    code: '200',
    data: blockchain.getBlockchain(),
  });
});

app.all('*', (req: Request, res: Response, next: NextFunction): void => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export { app };
