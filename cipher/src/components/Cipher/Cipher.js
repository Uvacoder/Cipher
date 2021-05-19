import convertToBinary from '../../Utils/AsciiToBinary'

export default class Cipher {
  constructor(key, rounds) {
    this.key = key
    this.rounds = rounds
  }

  encrypt(text) {
    return convertToBinary(text)
  }
}