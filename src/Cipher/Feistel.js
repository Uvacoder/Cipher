import { getBitWiseFunc } from "../Utils/BitwiseFunction"
import { sha256 } from 'js-sha256';
import { textToBinary,
  binaryToText, 
  decimalToBinary, 
  UTF16ToBase64, 
  base64ToUTF16 
} from "../Utils/Converters"

const CHAR_NO_OF_BITS = 16; // UTF-16 number of bits to each sign
const PADDING_CHARACTER = '\u0003' // Unicode 'End of Text'
const BLOCK_SIZE = 128; // Bit size of block
const KEY_SIZE = 64; // Bit size of key
const DEFAULT_ROUND_NO = 8; // Default number of encyption process
const DEFAULT_KEY = "Feistel Cipher"; // Default key - can be any string
const MODES = {
  ENCRYPT: 'encrypt',
  DECRYPT: 'decrypt'
};

/**
 * Feistel class is main point in Cipher Application.<br>
 * This is implementation of Feistel Cipher<br>
 * It supports all 65535 UTF-16 code points.
 * Use encrypt() and decrypt() with appropriate text data.<br>
 * You can read more about it here: 
 * {@link https://en.wikipedia.org/wiki/Feistel_cipher}
 */
class Feistel {
  /**
   * Provide key and number of encryption rounds
   * @constructor
   * @param {String} key Main encrypting key 
   * @param {Number} rounds Number of encryption rounds
   */
  constructor(key = DEFAULT_KEY, rounds = DEFAULT_ROUND_NO) {
    this.setKey(key)
    this.rounds = rounds
    this.encryptionFunction = getBitWiseFunc((a,b) => a ^ b)
    this.xor = getBitWiseFunc((a,b) => a ^ b)
  }
  
  /**
   * Function hashing key to binary
   * @param {String} key Encrypting key 
   * @returns Hashed key in binary
   */
  hashKey(key) {
    const noOfBytes = KEY_SIZE / 8;
    const sha64KeyArray = sha256.array(key).slice(0, noOfBytes);

    return sha64KeyArray.map(value => decimalToBinary(value, 8)).join('');
  }

  /**
   * Return key for each iteration
   * @param {String} masterKey Main key 
   * @param {Number} iteration Number of current iteration
   * @returns Sub key based on main key, for each iteration
   */
  getSubKey(masterKey, iteration) {
    return this.hashKey(`${masterKey}${iteration}${iteration ** 37}`);
  }

  /**
   * Spliting input in half
   * @param {String} binaryText Binary input 
   * @returns Array of strings with two sub-keys
   */
  divideEvenly(binaryText) {
    const half = binaryText.length / 2;

    return [binaryText.substr(0, half), binaryText.substr(half)];
  }

  setKey(key) {
    this.key = key;
    this.masterKey = this.hashKey(key);
  }
  
  setRounds(rounds) {
    this.rounds = rounds;
  }

  getKey() {
    return this.key;
  }

  setEncryptionOperator(operator) {
    this.encryptionFunction = getBitWiseFunc(operator)
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

export default Feistel;