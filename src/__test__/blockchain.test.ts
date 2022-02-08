import { Blockchain } from '@src/logic/Blockchain';
import { Block } from '@src/logic/Block';

describe('Blockchain class', () => {
  const blockchain = new Blockchain();

  it('should create an instance of Blockchain', () => {
    expect(blockchain).toBeTruthy();
  });

  it('should create an instance of Blockchain with a valid chain', () => {
    expect(blockchain.chain).toBeTruthy();
  });

  it('should create an instance of Blockchain with a valid chain and length of 1', () => {
    expect(blockchain.chain.length).toBe(1);
  });

  it('should create an instance of Blockchain with a valid chain and genesis block', () => {
    expect(blockchain.chain[0]).toBeTruthy();
  });

  it('should create an instance of Blockchain with a valid chain, genesis block, and hash', () => {
    expect(blockchain.chain[0].hash).toBeTruthy();
  });

  it('should create an instance of Blockchain with a valid chain, genesis block, and previous hash', () => {
    expect(blockchain.chain[0].previousHash).toBeTruthy();
  });

  it('should add a new block with a valid hash', () => {
    blockchain.addBlock(new Block(1, 1, Date.now(), { amount: 10 }));
    expect(blockchain.chain[1].hash).toBeTruthy();
  });

  it('should get the latest block', () => {
    expect(blockchain.getLatestBlock()).toBeTruthy();
    expect(blockchain.getLatestBlock().index).toBe(1);
    expect(blockchain.getLatestBlock()).toBeInstanceOf(Block);
    expect.objectContaining({
      index: 1,
      nonce: 1,
      timestamp: 1644283664558,
      data: { amount: 10 },
    });
  });

  it('should chain be valid', () => {
    expect(blockchain.isChainValid()).toBe(true);
    expect(blockchain.chain[1].hash).toBeTruthy();
  });

  it('should chain not valid', () => {
    blockchain.chain[1].hash = 'fake-hash';
    blockchain.chain[1].data = { amount: 100 };
    expect(blockchain.isChainValid()).toBeFalsy();
  });
});
