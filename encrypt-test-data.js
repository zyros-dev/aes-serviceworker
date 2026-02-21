const crypto = require('crypto');
const fs = require('fs');

const AES_KEY = Buffer.from([79, 162, 15, 84, 108, 136, 121, 158, 188, 41, 148, 174, 70, 56, 170, 74, 191, 173, 147, 242, 170, 147, 229, 44, 86, 90, 197, 181, 151, 85, 101, 225]);

const plaintext = 'Hello, this is a test message!';
const nonce = crypto.randomBytes(12);

const cipher = crypto.createCipheriv('aes-256-gcm', AES_KEY, nonce);
let ciphertext = cipher.update(plaintext, 'utf8');
ciphertext = Buffer.concat([ciphertext, cipher.final()]);
const tag = cipher.getAuthTag();

const encrypted = Buffer.concat([nonce, ciphertext, tag]);

fs.writeFileSync('test-encrypted.bin', encrypted);
console.log('Encrypted data written to test-encrypted.bin');
console.log('Plaintext:', plaintext);
console.log('Encrypted length:', encrypted.length);
