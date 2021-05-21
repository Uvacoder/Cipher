import { split, PADDING_CHARACTER, add, CHARSET } from '../../Utils/StringActions'
import { generateKey } from '../../Utils/KeyGenerator'
import { xor } from "../../Utils/XOR"
import convert from "../../Utils/AsciiToBinary"

export default class Cipher {
  constructor(key, rounds) {
    this.key = key
    this.rounds = rounds
  }
  
  getKey() {
    return this.key;
  }

  encrypt(data) {

    const binary = convert(data)
    const key = generateKey(data.length)
    const binaryKey = convert(key)
    const keyParts = split(binaryKey)
    let parts = split(binary)
    
    this.key = key

    const L1 = parts[0]
    const R1 = parts[1]
    const K1 = keyParts[0]
    const K2 = keyParts[1]

    // first round
    const f1 = xor(R1, K1)
    const R2 = xor(f1, L1)
    const L2 = R1

    // secound round
    const f2 = xor(R2, K2)
    const R3 = xor(f2, L2)
    const L3 = R2
    console.log(CHARSET)
    const binaryResult = L3 + R3
    const result = binaryResult.match(/.{1,8}/g).map((el) => String.fromCharCode((parseInt(el, 2)))).join('')

    return result





    // const xoredFirstRight = xor(parts[1], keyParts[0]);
    // // console.log(xoredRight)
    // parts = [xoredFirstRight, parts[0]]
    // const xoredLeft = xor(parts[1], keyParts[1]);
    // parts = [xoredLeft, parts[0]]
    

    // const concatenated = parts[0].concat(parts[1]).join('').match(/.{1,8}/g)
    // const result = concatenated.map((el) => String.fromCharCode((parseInt(el, 2))))
    
    // return result


    // return parts[0].toString(2) + parts[1].toString(2)

    // if (data.length % 2 == 1) {
    //   data = data.padStart(data.length + 1, PADDING_CHARACTER)
    // }

    // const encryptionKey = generateKey(data.length)
    // const keyParts = split(this.key)
    // let parts = split(data)

    // this.key = encryptionKey;

    // if (parts.length !== 2 || parts[0].length !== parts[1].length) {
    //   throw new Error('invalid string: unable to split')
    // }

    // for (let i = 0; i < 2; ++i) {
    //   const ciphered = xor(parts[0], add(parts[1], keyParts[i]))
    //   console.log(ciphered)
    //   parts = [parts[1], ciphered]
    // }

    // return Array.from(parts[0] + parts[1]).join('')
  }

  decrypt(data) {

    const binary = convert(data)
    let parts = split(binary)
    // const key = generateKey(data.length)
    const binaryKey = convert(this.key)
    const keyParts = split(binaryKey)
    
    // this.key = key

    const L4 = parts[0]
    const R4 = parts[1]
    const K1 = keyParts[0]
    const K2 = keyParts[1]

    const f3 = xor(L4, K2)
    const L5 = xor(R4, f3)
    const R5 = L4
    
    const f4 = xor(L5, K1)
    const L6 = xor (R5, f4)
    const R6 = L5
    const PT1 = L6 + R6

    const result = PT1.match(/.{1,8}/g).map((el) => String.fromCharCode((parseInt(el, 2)))).join('')

    return result

    // return PT1

    // // first round
    // const f1 = xor(R1, K1)
    // const R2 = xor(f1, L1)
    // const L2 = R1

    // // secound round
    // const f2 = xor(R2, K2)
    // const R3 = xor(f2, L2)
    // const L3 = R2

    // const binaryResult = L3 + R3
    // const result = binaryResult.match(/.{1,8}/g).map((el) => String.fromCharCode((parseInt(el, 2)))).join('')

    // return result






  //   const o = data.toString('utf-8')
  //   if (o.length % 2 != 0) {
  //     throw new Error('invalid obfuscated data')
  //   }

  //   const parts = split(o)
  //   const keyParts = split(this.key)
  //   console.log(xor(keyParts[1], keyParts[0]))

  //   let a = parts[1]
  //   let b = parts[0]
  //   let keyA = keyParts[1]
  //   let keyB = keyParts[0]

  //   // for (let i = 0; i < 2; ++i) {
  //   //   const tmp = xor(b, keyA)
  //   //   a = b
  //   //   b = tmp

  //   //   keyA = keyB
  //   // }

  //   const decryptedA = xor(add(a, keyA))
  //   const decryptedB = xor(add(b, keyB))

  //   return (decryptedB + decryptedA)
  // }
  
  }
}