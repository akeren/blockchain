export interface ITransaction {
  fromAddress: string;
  toAddress: string;
  amount: number;
  signature: string;

  hashTransaction(): string;
  // eslint-disable-next-line no-unused-vars
  signTransaction(signingKey: any): void;
  isValid(): boolean;
}

export interface IBlock {
  nonce: number;
  timestamp: number;
  transactions: ITransaction[];
  hash: string;
  previousHash?: string;

  hashBlock(): string;
}
