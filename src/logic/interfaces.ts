export interface ITransaction {
  fromAddress?: string;
  toAddress: string;
  amount: number;
}

export interface IBlock {
  nonce: number;
  timestamp: number;
  transactions: ITransaction[];
  hash: string;
  previousHash?: string;

  hashBlock(): string;
}
