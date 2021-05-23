import { getBitWiseFunc } from "../Utils/BitwiseFunction"
import { textToBinary, binaryToText, decimalToBinary, UTF16ToBase64, base64ToUTF16 } from "../Utils/Converters"
import { sha256 } from 'js-sha256';

// coments in this file WiP to make it easier to write documetation on Sunday

const CHAR_NO_OF_BITS = 16; // UTF-16 number of bits to each sign
const PADDING_CHARACTER = '\u0003' // Unicode 'End of Text'
const BLOCK_SIZE = 128; // bit size of block DO NOT CHANGE!!!
const KEY_SIZE = 64; 
const MODES = {
  ENCRYPT: 'encrypt',
  DECRYPT: 'decrypt'
}
export default class Feistel {
  constructor(key, rounds) {
    this.key = key
    this.masterKey = this.hashKey(key)
    this.rounds = rounds
    this.encryptionFunction = getBitWiseFunc((a,b) => a ^ b)
    this.xor = getBitWiseFunc((a,b) => a ^ b)
  }
  
  // input as string key and output as 64bit key hashed with sha256 returned bianry
  hashKey(key) {
    const noOfBytes = KEY_SIZE / 8;
    const sha64KeyArray = sha256.array(key).slice(0, noOfBytes);

    return sha64KeyArray.map(value => decimalToBinary(value, 8)).join('');
  }

  // input master key and get special key for each iteration
  // function insisde can be modified as you want :)
  getSubKey(masterKey, iteration) {
    return this.hashKey(`${masterKey}${iteration}${iteration ** 37}`);
  }

  divideEvenly(binaryText) {
    const half = binaryText.length / 2;

    return [binaryText.substr(0, half), binaryText.substr(half)];
  }

  getKey() {
    return this.key;
  }

  setEncryptionOperator(operator) {
    this.encryptionFunction = getBitWiseFunc(operator)
    console.log(operator)
  }

  makeRound(left, right, key) {
    const functionResult = this.encryptionFunction(right, key);
    const newRight = this.xor(functionResult, left);
    const newLeft = right;

    return [newLeft, newRight]
  }

  processSingleBlock(mode, inputBinaryText) {
    let [left, right] = this.divideEvenly(inputBinaryText);

    for (let i = 0; i < this.rounds; i++) {
      const subKeyIteration = mode === MODES.ENCRYPT ? i : this.rounds - i - 1;
      const key = this.getSubKey(this.masterKey, subKeyIteration);

      [left, right] = this.makeRound(left, right, key);
    } 

    return right + left;
  }

  process(mode, inputText) {
    const blocks = this.divideIntoBlocks(inputText);
    let result = '';

    for (const textBlock of blocks) {  
      const blockResult = this.processSingleBlock(mode, textToBinary(textBlock, CHAR_NO_OF_BITS))
      result += binaryToText(blockResult, CHAR_NO_OF_BITS);
    }

    return result;
  }

  divideIntoBlocks(text) {
    const noOfChars = BLOCK_SIZE / CHAR_NO_OF_BITS;
    const blocks = [];

    for (let i = 0; i < text.length; i+= noOfChars) {
      const blockText = text.slice(i, i + noOfChars);

      blocks.push(blockText);
    }

    const lastBlockLength = blocks[blocks.length - 1].length;
    const requiredPaddingSize = noOfChars - lastBlockLength;

    if (requiredPaddingSize) {
      const padding = PADDING_CHARACTER.repeat(requiredPaddingSize);

      blocks[blocks.length - 1] += padding;
    }

    return blocks;
  }

  encrypt(text) {
    const cipher = this.process(MODES.ENCRYPT, text);

    return UTF16ToBase64(cipher)
  }

  decrypt(base64Text) {  
    // const decoded = atob(base64Text);
    // const cipher = from16BitBinaryToUnicode(decoded);
    const cipher = base64ToUTF16(base64Text)
    const result = this.process(MODES.DECRYPT, cipher);
    const paddingIndex = result.indexOf(PADDING_CHARACTER);
    let decryptedText = null;

    if (paddingIndex === -1) {
      decryptedText = result;
    } else {
      decryptedText = result.slice(0, paddingIndex)
    }

    return decryptedText
  }
}