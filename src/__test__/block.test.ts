import { Block } from '@src/logic/Block';

describe('Block class', () => {
  const block = new Block(
    1,
    Date.now(),
    { amount: 10 },
    '0000000000000000000000000000000000000000000000000000000000000000'
  );

  describe('Constructor', () => {
    it('should aptly save arguments', () => {
      expect(block.index).toBe(1);
      expect(block.nonce).toBe(block.nonce);
      expect(block.timestamp).toBe(block.timestamp);
      expect(block.data).toEqual({ amount: 10 });
      expect(block.previousHash).toBe('0000000000000000000000000000000000000000000000000000000000000000');
    });

    it('should aptly save arguments, without previousHash', () => {
      const blockWithoutPreviousHash = new Block(2, Date.now(), { amount: 20 });
      expect(blockWithoutPreviousHash.index).toBe(2);
      expect(blockWithoutPreviousHash.nonce).toBe(blockWithoutPreviousHash.nonce);
      expect(blockWithoutPreviousHash.timestamp).toBe(blockWithoutPreviousHash.timestamp);
      expect(blockWithoutPreviousHash.data).toEqual({ amount: 20 });
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
        new Block(1, 1644283664558, { amount: 10 }, '0000000000000000000000000000000000000000000000000000000000000000')
          .hash
      ).toEqual('e6b40e9df9f808824f4c6059833ccfd43a714eecc46ed4e555a9a4d0a277f327');
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
    const { index, hash, nonce, timestamp, data, previousHash } = block;

    expect.objectContaining({
      index,
      nonce,
      timestamp,
      data,
      hash,
      previousHash,
    });
  });

  it('should correctly have all the block properties, without previousHash', () => {
    const blockWithoutPreviousHash = new Block(2, Date.now(), { amount: 20 });
    const { index, hash, nonce, timestamp, data } = blockWithoutPreviousHash;

    expect.objectContaining({
      index,
      nonce,
      timestamp,
      data,
      hash,
    });
  });

  it('should block be an instance of Block', () => {
    expect(block).toBeInstanceOf(Block);
  });
});
