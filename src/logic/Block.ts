import { createHash } from 'crypto';
import { IBlock } from '@src/logic/interfaces';

export class Block implements IBlock {
  public index: number;

  public nonce: number;

  public timestamp: number;

  public data: any;

  public hash: string;

  public previousHash?: string;

  constructor(index: number, nonce: number, timestamp: number, data: any, previousHash?: string) {
    this.index = index;
    this.nonce = nonce;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.hashBlock();
  }

  hashBlock(): string {
    const hash = createHash('sha256');

    hash.update(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash);

    return hash.digest('hex');
  }
}
