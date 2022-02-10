import { Block } from '@src/logic/Block';
import { Transaction } from '@src/logic/Transaction';
import { log } from '@src/utils/logger';

export class Blockchain {
  private chain: Block[];

  private pendingTransaction: Transaction[];

  private miningReward: number;

  public difficulty: number;

  constructor(difficulty = 2) {
    this.chain = [Blockchain.createGenesisBlock()];
    this.difficulty = difficulty;
    this.miningReward = 100;
    this.pendingTransaction = [];
  }

  private static createGenesisBlock(): Block {
    return new Block(
      Date.now(),
      [new Transaction('Genesis', 'Genesis address', 2000)],
      Blockchain.genesisPreviousHash()
    );
  }

  getBlockchain(): Block[] {
    return this.chain;
  }

  getPendingTransactions(): Transaction[] {
    return this.pendingTransaction;
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress: string): void {
    const block = new Block(Date.now(), this.pendingTransaction, this.getLatestBlock().hash);
    block.mineBlock(this.difficulty);

    log.info(`Block successfully mined!`);
    this.chain.push(block);

    this.pendingTransaction = [new Transaction('Mining Reward', miningRewardAddress, this.miningReward)];
  }

  addTransaction(transaction: Transaction): void {
    if (!transaction.fromAddress || !transaction.toAddress || !transaction.amount) {
      throw new Error('Transaction must include fromAddress, toAddress and amount');
    }

    if (!transaction.isValid()) {
      throw new Error('Can not add invalid transaction to chain');
    }

    this.pendingTransaction.push(transaction);
  }

  getBalanceOfAddress(address: string): number {
    let balance = 0;

    // eslint-disable-next-line no-restricted-syntax
    for (const block of this.chain) {
      // eslint-disable-next-line no-restricted-syntax
      for (const transaction of block.transactions) {
        if (transaction.fromAddress === address) {
          balance -= transaction.amount;
        }

        if (transaction.toAddress === address) {
          balance += transaction.amount;
        }
      }
    }

    return balance;
  }

  addBlock(block: Block): void {
    // eslint-disable-next-line no-param-reassign
    block.previousHash = this.getLatestBlock().hash;

    block.mineBlock(this.difficulty);

    this.chain.push(block);
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i += 1) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (!currentBlock.hasValidTransaction()) {
        return false;
      }

      if (
        Blockchain.isCurrentBlockHashValid(currentBlock) ||
        Blockchain.isCurrentBlockPreviousHashNotEqualToPreviousBlockHash(currentBlock, previousBlock)
      ) {
        return false;
      }
    }

    return true;
  }

  static isCurrentBlockHashValid(currentBlock: Block): boolean {
    return currentBlock.hash !== currentBlock.hashBlock();
  }

  static isCurrentBlockPreviousHashNotEqualToPreviousBlockHash(currentBlock: Block, previousBlock: Block): boolean {
    return currentBlock.previousHash !== previousBlock.hash;
  }

  private static genesisPreviousHash(): string {
    return '0000000000000000000000000000000000000000000000000000000000000000';
  }
}
