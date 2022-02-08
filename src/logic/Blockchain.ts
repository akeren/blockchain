import { Block } from '@src/logic/Block';

export class Blockchain {
  public chain: Block[];

  public difficulty: number;

  constructor(difficulty = 2) {
    this.chain = [Blockchain.createGenesisBlock()];
    this.difficulty = difficulty;
  }

  private static createGenesisBlock(): Block {
    return new Block(0, Date.now(), 'Genesis block', Blockchain.genesisPreviousHash());
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
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
