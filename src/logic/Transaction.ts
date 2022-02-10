import { ITransaction } from '@src/logic/interfaces';

export class Transaction implements ITransaction {
  public fromAddress?: string;

  public toAddress: string;

  public amount: number;

  constructor(toAddress: string, amount: number, fromAddress?: string) {
    this.toAddress = toAddress;
    this.amount = amount;
    this.fromAddress = fromAddress;
  }
}
