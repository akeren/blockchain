import express, { Request, Response, NextFunction, Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import elliptic from 'elliptic';
import config from '@src/config/';
import { AppError } from '@src/errors/';
import { globalErrorHandler } from '@src/handlers/globalErrorHandler';
import { Blockchain } from '@src/logic/Blockchain';
import { Transaction } from '@src/logic/Transaction';
import { Block } from '@src/logic/Block';

const app: Express = express();

// set security for HTTP Headers
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (config.app.env === 'development') app.use(morgan('dev'));

app.get('/', (req: Request, res: Response): void => {
  // eslint-disable-next-line new-cap
  const ec = new elliptic.ec('secp256k1');

  const myKey = ec.keyFromPrivate('52b507431fac5cbee71eb32fe6120cc6a807407ca632b259972f079194cd8b87');
  const myWalletAddress = myKey.getPublic('hex');

  const blockchain = new Blockchain();

  const trx1 = new Transaction(myWalletAddress, '0x2', 10);
  trx1.signTransaction(myKey);
  blockchain.addTransaction(trx1);

  console.log(`Miner started!`);
  blockchain.minePendingTransactions(myWalletAddress);
  console.log(`Miner finished!`);

  console.log(`Monique balance: ${blockchain.getBalanceOfAddress(myWalletAddress)}`);

  // blockchain.getBlockchain()[1].transactions[0].amount = 100;
  console.log(blockchain.isChainValid());
  console.log(
    new Block(
      1644283664558,
      [new Transaction('0x1', '0x2', 10)],
      '0000000000000000000000000000000000000000000000000000000000000000'
    )
  );

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
