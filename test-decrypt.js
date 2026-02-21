const crypto = require('crypto');
const fs = require('fs');

const AES_KEY = Buffer.from([79, 162, 15, 84, 108, 136, 121, 158, 188, 41, 148, 174, 70, 56, 170, 74, 191, 173, 147, 242, 170, 147, 229, 44, 86, 90, 197, 181, 151, 85, 101, 225]);

const encryptedData = fs.readFileSync('test-encrypted.bin');

const nonce = encryptedData.slice(0, 12);
const ciphertext = encryptedData.slice(12, -16);
const tag = encryptedData.slice(-16);

const decipher = crypto.createDecipheriv('aes-256-gcm', AES_KEY, nonce);
decipher.setAuthTag(tag);

let plaintext = decipher.update(ciphertext);
plaintext = Buffer.concat([plaintext, decipher.final()]);

console.log('✓ Decryption successful!');
console.log('Decrypted text:', plaintext.toString('utf8'));
