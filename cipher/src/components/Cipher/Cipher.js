import { split, PADDING_CHARACTER } from '../../Utils/StringActions'
import { generateKey } from '../../Utils/KeyGenerator'
import { xor } from "../../Utils/XOR"

export default class Cipher {
  constructor(key, rounds) {
    this.key = key
    this.rounds = rounds
  }
  
  getKey() {
    return this.key;
  }

  encrypt(data) {
    // chceck if string can be split in even parts if no add padding character
    if (data.length % 2 == 1) {
      data = data.padStart(data.length + 1, PADDING_CHARACTER)
    }
    // Apply Feistel Cipher
    const encryptionKey = generateKey(data.length)
    let parts = split(data)

    this.key = encryptionKey;

    if (parts.length !== 2 || parts[0].length !== parts[1].length) {
      throw new Error('invalid string: unable to split')
    }

    for (let i = 0; i < 2; ++i) {
      const ciphered = xor(parts[0], encryptionKey)

      parts = [parts[1], ciphered]
    }

    return Array.from(parts[0] + parts[1]).join('')
  }

  decrypt(data) {
    const o = data.toString('utf-8')
    console.log(o)
    if (o.length % 2 != 0) {
      throw new Error('invalid obfuscated data')
    }
    // Apply the balanced Feistel cipher
    const parts = split(o)
    let a = parts[1]
    let b = parts[0]
    for (let i = 0; i < 2; ++i) {
      const tmp = xor(b, this.key)
      b = a
      a = tmp
    }
    return (b + a)
  }
  
}