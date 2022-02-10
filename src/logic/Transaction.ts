import { createHash } from 'crypto';
import elliptic from 'elliptic';
import { ITransaction } from '@src/logic/interfaces';

// eslint-disable-next-line new-cap
const ec = new elliptic.ec('secp256k1');

export class Transaction implements ITransaction {
  public fromAddress: string;

  public toAddress: string;

  public amount: number;

  public signature!: string;

  constructor(fromAddress: string, toAddress: string, amount: number) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  hashTransaction(): string {
    const hash = createHash('sha256');

    hash.update(this.toAddress + this.amount + this.fromAddress);

    return hash.digest('hex');
  }

  signTransaction(signingKey: any): void {
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('You cannot sign transactions for other wallets!');
    }

    const hashTx = this.hashTransaction();
    const signature = signingKey.sign(hashTx, 'base64');
    this.signature = signature.toDER('hex');
  }

  isValid(): boolean {
    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature in this transaction');
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');

    return publicKey.verify(this.hashTransaction(), this.signature);
  }
}
