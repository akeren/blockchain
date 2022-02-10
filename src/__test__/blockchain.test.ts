import elliptic from 'elliptic';
import { Blockchain } from '@src/logic/Blockchain';
import { Block } from '@src/logic/Block';
import { Transaction } from '@src/logic/Transaction';

describe('Blockchain class', () => {
  // eslint-disable-next-line new-cap
  const ec = new elliptic.ec('secp256k1');

  const myKey = ec.keyFromPrivate('52b507431fac5cbee71eb32fe6120cc6a807407ca632b259972f079194cd8b87');
  const myWalletAddress = myKey.getPublic('hex');

  const blockchain = new Blockchain();

  const trx1 = new Transaction(myWalletAddress, '0x2', 10);
  trx1.signTransaction(myKey);
  blockchain.addTransaction(trx1);

  blockchain.minePendingTransactions(myWalletAddress);

  it('should create an instance of Blockchain', () => {
    expect(blockchain).toBeTruthy();
  });

  it('should create an instance of Blockchain with a valid chain', () => {
    expect(blockchain.getBlockchain()).toBeTruthy();
  });

  it('should create an instance of Blockchain with a valid chain and length of 2', () => {
    expect(blockchain.getBlockchain().length).toBe(2);
  });

  it('should create an instance of Blockchain with a valid chain and genesis block', () => {
    expect(blockchain.getBlockchain()[0]).toBeTruthy();
  });

  it('should create an instance of Blockchain with a valid chain, genesis block, and hash', () => {
    expect(blockchain.getBlockchain()[0].hash).toBeTruthy();
  });

  it('should create an instance of Blockchain with a valid chain, genesis block, and previous hash', () => {
    expect(blockchain.getBlockchain()[0].previousHash).toBeTruthy();
  });

  it('should add a new block with a valid hash', () => {
    blockchain.addBlock(new Block(Date.now(), [new Transaction('0x1', '0x2', 10)]));
    expect(blockchain.getBlockchain()[1].hash).toBeTruthy();
  });

  it('should get the latest block', () => {
    expect(blockchain.getLatestBlock()).toBeTruthy();
    expect(blockchain.getLatestBlock()).toBeInstanceOf(Block);
    expect.objectContaining({
      index: 1,
      nonce: 1,
      timestamp: 1644283664558,
      transactions: [
        {
          fromAddress: '0x1',
          toAddress: '0x2',
          amount: 10,
        },
      ],
    });
  });

  it('should chain contain a valid transaction', () => {
    expect(blockchain.getBlockchain()[1].hasValidTransaction()).toBe(true);
  });

  it('should chain is valid', () => {
    const key = ec.keyFromPrivate('52b507431fac5cbee71eb32fe6120cc6a807407ca632b259972f079194cd8b87');
    const walletAddress = key.getPublic('hex');

    const chain = new Blockchain();

    const tx = new Transaction(walletAddress, '0x2', 10);
    tx.signTransaction(key);
    chain.addTransaction(tx);

    chain.minePendingTransactions(walletAddress);

    expect(chain.isChainValid()).toBeTruthy();

    chain.getBlockchain()[1].transactions[0].amount = 100;
    expect(chain.isChainValid()).toBeFalsy();
  });
});
