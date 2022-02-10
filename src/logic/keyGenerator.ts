import elliptic from 'elliptic';

// eslint-disable-next-line new-cap
const ec = new elliptic.ec('secp256k1');

const key = ec.genKeyPair();

const privateKey = key.getPrivate('hex');
const publicKey = key.getPublic('hex');

export { publicKey, privateKey };
