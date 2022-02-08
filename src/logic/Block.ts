import { createHash } from 'crypto';
import { IBlock } from '@src/logic/interfaces';

export class Block implements IBlock {
  public index: number;

  public nonce: number;

  public timestamp: number;

  public data: any;

  public hash: string;

  public previousHash?: string;

  constructor(index: number, timestamp: number, data: any, previousHash?: string) {
    this.index = index;
    this.nonce = 0;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.hashBlock();
  }

  hashBlock(): string {
    const hash = createHash('sha256');

    hash.update(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce);

    return hash.digest('hex');
  }

  mineBlock(difficulty: number): void {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce += 1;
      this.hash = this.hashBlock();
    }

    console.log(`Block mined: ${this.hash}`);
  }
}
