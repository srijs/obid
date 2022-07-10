"use strict";

// Less "16cfhilostu" for more clarity and less profanity
const ALPHABET = "2345789ABDEGJKMNPQRVWXYZabdegjkmnpqrvwxyz";
const ALPHABET_INV_0Z = [
  0, 0, 1, 2, 3, 4, 0, 5, 6, 7, 0, 0, 0, 0, 0, 0, 0, 8, 9, 0, 10, 11, 0, 12, 0,
  0, 13, 14, 0, 15, 16, 0, 17, 18, 19, 0, 0, 0, 20, 21, 22, 23, 24, 0, 0, 0, 0,
  0, 0, 25, 26, 0, 27, 28, 0, 29, 0, 0, 30, 31, 0, 32, 33, 0, 34, 35, 36, 0, 0,
  0, 37, 38, 39, 40, 41,
];

// Regular expression to validate IDs
const REGEXP = new RegExp(`^[${ALPHABET}]{12}$`);

// Random constants for Feistel cipher
const K0 = 0xf6dc56e5;
const K1 = 0x130bab48;
const K2 = 0x0d9c9c29;
const K3 = 0xb622bc65;
const K4 = 0x881d51f3;
const K5 = 0x35fd7a94;

// Fast string hash to create 32-bit salt
function hash(s) {
  let hash = 5381;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0;
  }
  return hash;
}

// Scratch space for encode/decode functions
const view = new DataView(new ArrayBuffer(8));

// Decode ID using 32-bit salt
function decodeId(salt, id) {
  if (!REGEXP.test(id)) {
    return undefined;
  }

  const l3 = decodeUint32(id.substr(6, 6));
  const r3 = decodeUint32(id.substr(0, 6));

  const l2 = r3 ^ Math.imul(l3 + K4, K5);
  const l1 = l3 ^ Math.imul(l2 + K2, K3);
  const l0 = l2 ^ Math.imul(l1 + K0, K1);

  view.setUint32(0, l1 ^ salt);
  view.setUint32(4, l0 ^ salt);
  return view.getBigUint64(0);
}

// Encode ID using 32-bit salt
function encodeId(salt, id) {
  view.setBigUint64(0, id);
  const l0 = view.getUint32(4) ^ salt;
  const r0 = view.getUint32(0) ^ salt;

  const r1 = l0 ^ Math.imul(r0 + K0, K1);
  const r2 = r0 ^ Math.imul(r1 + K2, K3);
  const r3 = r1 ^ Math.imul(r2 + K4, K5);

  return encodeUint32(r3 >>> 0) + encodeUint32(r2 >>> 0);
}

// Convert from 32-bit unsigned to base-41 string
function encodeUint32(n) {
  let s = "";
  let d = 115856201;
  for (let i = 0; i < 6; i++) {
    const x = (n / d) | 0;
    s += ALPHABET[x];
    n -= x * d;
    d = (d / 41) | 0;
  }
  return s;
}

// Convert from base-41 string to 32-bit unsigned
function decodeUint32(s) {
  let n = 0;
  let d = 115856201;
  for (let i = 0; i < 6; i++) {
    const c = s.charCodeAt(i);
    const x = ALPHABET_INV_0Z[c - 48];
    n += d * (x - 1);
    d = (d / 41) | 0;
  }
  return n;
}

module.exports = function objectId(type) {
  const salt = hash(type);

  return {
    decode: (id) => decodeId(salt, id),
    encode: (id) => encodeId(salt, id),
  };
};
