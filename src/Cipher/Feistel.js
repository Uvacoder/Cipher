import { generateKey } from '../Utils/KeyGenerator'
import { xor } from "../Utils/XOR"
import { textToBinary, binaryToText } from "../Utils/Converters"
import { encode, decode } from 'js-base64';

export default class Feistel {
  constructor(key, rounds) {
    this.key = key
    this.rounds = rounds
    this.encryptionFunction = xor
  }
  
  getKey() {
    return this.key;
  }

  makeRound(left, right, key) {
    const functionResult = this.encryptionFunction(right, key);
    const newRight = xor(functionResult, left);
    const newLeft = right;

    return [newLeft, newRight]
  }

  divideEvenly(binaryText, rounds) {
    const half = binaryText.length / 2;

    return [binaryText.substr(0, half), binaryText.substr(half)];
  }
  
  sumAndConvertToText(left, right) {
    const binaryResult = right + left

    return binaryToText(binaryResult)
  }

  calculateKeyLength(textLenght, rounds) {
    return (textLenght / 2) * rounds
  }

  encrypt(text) {
    const key = generateKey(text.length)
    const binaryData = textToBinary(text)
    const binaryKey = textToBinary(key)
    const keyParts = this.divideEvenly(binaryKey)

    let [left, right] = this.divideEvenly(binaryData)

    this.key = key

    for (let i = 0; i < 2; i++) {
      [left, right] = this.makeRound(left, right, keyParts[i]);
    }

    const cipher = this.sumAndConvertToText(left, right)
    const base64Cipher = encode(cipher)
    
    return base64Cipher
  }

  decrypt(base64Cipher) {
    const cipher = decode(base64Cipher)
    const binaryCipher = textToBinary(cipher)
    const binaryKey = textToBinary(this.key)
    const keyParts = this.divideEvenly(binaryKey)
    let [left, right] = this.divideEvenly(binaryCipher)

    for (let i = 1; i >= 0; i--) {
      [left, right] = this.makeRound(left, right, keyParts[i]);
    }

    return this.sumAndConvertToText(left, right)
  }
}