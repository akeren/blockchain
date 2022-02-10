import { createHash } from 'crypto';
import { IBlock } from '@src/logic/interfaces';
import { log } from '@src/utils/logger';
import { Transaction } from '@src/logic/Transaction';

export class Block implements IBlock {
  public nonce: number;

  public timestamp: number;

  public transactions: Transaction[];

  public hash: string;

  public previousHash?: string;

  constructor(timestamp: number, transactions: Transaction[], previousHash?: string) {
    this.nonce = 0;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.hashBlock();
  }

  hashBlock(): string {
    const hash = createHash('sha256');

    hash.update(this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce);

    return hash.digest('hex');
  }

  mineBlock(difficulty: number): void {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce += 1;
      this.hash = this.hashBlock();
    }

    log.info(`Block mined: ${this.hash}`);
  }
}
