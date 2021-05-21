import { split } from '../../Utils/StringActions'
import { generateKey, checkLenghtAndFix } from '../../Utils/KeyGenerator'
import { xor } from "../../Utils/XOR"
import { textToBinary, binaryToText } from "../../Utils/Converters"

export default class Cipher {
  constructor(key, rounds) {
    this.key = key
    this.rounds = rounds
  }
  
  getKey() {
    return this.key;
  }

  encrypt(data) {

    const key = generateKey(data.length)
    const binaryData = textToBinary(data)
    const binaryKey = textToBinary(key)
    const keyParts = split(binaryKey)
    const encryptionFunction = xor
    let cipherParts = split(binaryData)

    this.key = key

    for (let i = 0; i < 2; i++) {
      const temp = xor(encryptionFunction(cipherParts[1], keyParts[i]), cipherParts[0])
      cipherParts = [cipherParts[1], temp]
    }

    const binaryResult = cipherParts[0] + cipherParts[1]
    const cipher = binaryToText(binaryResult)
    const base64Cipher = btoa(cipher)
    
    return base64Cipher
  }

  decrypt(base64Cipher) {

    const cipher = atob(base64Cipher)
    const binaryCipher = textToBinary(cipher)
    const binaryKey = textToBinary(this.key)
    const keyParts = split(binaryKey)
    const decryptionFunction = xor
    let cipherParts = split(binaryCipher)

    for (let i = 1; i >= 0; i--) {
      const temp = xor(decryptionFunction(cipherParts[0], keyParts[i]), cipherParts[1])
      cipherParts = [temp, cipherParts[0]]
    }

    const binaryResult = cipherParts[0] + cipherParts[1]
    const decipheredText = binaryToText(binaryResult)

    return decipheredText
  }
}