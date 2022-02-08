export interface IBlock {
  index: number;
  nonce: number;
  timestamp: number;
  data: any;
  hash: string;
  previousHash?: string;

  hashBlock(): string;
}
