import { Block } from '@src/logic/Block';
import { Transaction } from '@src/logic/Transaction';

describe('Block class', () => {
  const block = new Block(
    Date.now(),
    [new Transaction('0x1', '0x2', 10)],
    '0000000000000000000000000000000000000000000000000000000000000000'
  );

  describe('Constructor', () => {
    it('should aptly save arguments', () => {
      expect(block.nonce).toBe(block.nonce);
      expect(block.timestamp).toBe(block.timestamp);
      expect(block.previousHash).toBe('0000000000000000000000000000000000000000000000000000000000000000');
    });

    it('should aptly save arguments, without previousHash', () => {
      const blockWithoutPreviousHash = new Block(Date.now(), [new Transaction('0x1', '0x2', 10)]);
      expect(blockWithoutPreviousHash.nonce).toBe(blockWithoutPreviousHash.nonce);
      expect(blockWithoutPreviousHash.timestamp).toBe(blockWithoutPreviousHash.timestamp);
      expect(blockWithoutPreviousHash.previousHash).toBeUndefined();
    });
  });

  describe('hashBlock', () => {
    it('should return a string', () => {
      expect(typeof block.hashBlock()).toBe('string');
    });

    it('should return a string with length of 64', () => {
      expect(block.hashBlock().length).toBe(64);
    });

    it('should return a string with hexadecimal characters', () => {
      const hexadecimalCharacters = '0123456789abcdef';
      const hash = block.hashBlock();
      for (let i = 0; i < hash.length; i += 1) {
        expect(hexadecimalCharacters.indexOf(hash[i])).not.toBe(-1);
      }
    });

    it('should correctly hash block with SHA256', () => {
      expect(
        new Block(
          1644283664558,
          [new Transaction('0x1', '0x2', 10)],
          '0000000000000000000000000000000000000000000000000000000000000000'
        ).hash
      ).toEqual('e1bbac0b913461ae2d84c9737072263b1cfeb935ae7e0dccbb7a0e231aeb0eeb');
    });

    it('should set hash property', () => {
      expect(block.hash).toBe(block.hashBlock());
    });

    it('should create an instance of a block', () => {
      expect(block).toBeTruthy();
    });

    it('should create an instance of a block with a valid hash', () => {
      expect(block.hash).toBeTruthy();
    });

    it('should create an instance of a block with a valid previous hash', () => {
      expect(block.previousHash).toBeTruthy();
    });
  });

  it('should correctly have all the block properties', () => {
    const { hash, nonce, timestamp, transactions, previousHash } = block;

    expect.objectContaining({
      nonce,
      timestamp,
      transactions,
      hash,
      previousHash,
    });
  });

  it('should correctly have all the block properties, without previousHash', () => {
    const blockWithoutPreviousHash = new Block(Date.now(), [new Transaction('0x1', '0x2', 10)]);
    const { hash, nonce, timestamp, transactions } = blockWithoutPreviousHash;

    expect.objectContaining({
      nonce,
      timestamp,
      transactions,
      hash,
    });
  });

  it('should block be an instance of Block', () => {
    expect(block).toBeInstanceOf(Block);
  });
});
