import Feistel from './Feistel';

let algorithm;

beforeEach(() => {
  algorithm = new Feistel('generic_key', 8);
});

test('Feistel - test', () => {
  expect(typeof algorithm).toBe("object");
});

test('Feistel - encrypt', () => {
  algorithm.setRounds(12);
  algorithm.setKey("myKey")
  algorithm.setEncryptionOperator((a, b) => a ^ b)
  
  expect(algorithm.encrypt('Tab  Space Emoji💔')).toBe("5jKczqg0AlWYiw8oGzX9N6syoM6yNApVr4sLKFk1mDfFMszO2zRgVfFT+vR6Nd43");
});

test('Feistel - decrypt', () => {
  algorithm.setRounds(42);
  algorithm.setKey("MovieLounge")
  algorithm.setEncryptionOperator((a, b) => a ^ b)
  
  expect(algorithm.decrypt('wUKfEcuxfFjKa3JA4+zOxfdCshH6sU9YymtwQM7s/cU=')).toBe("23.05.2021");
});

test('Feistel - hashKey', () => {
  expect(algorithm.hashKey("Feistel")).toBe("0001100001001011010011010001011010111011111000110010000000001100");
  expect(algorithm.hashKey("Movie Lounge")).toBe("1001110110001101111001101100011110110100111110010110000110010100");
  expect(algorithm.hashKey("👨‍🎓👩‍🎓")).toBe("0001100000001101001000111001100001111010101100101110101011111101");
});

test('Feistel - getSubKey', () => {
  expect(algorithm.getSubKey("some main key")).toBe("0100111101110010100101111101110000001001010101110011101010001111");
  expect(algorithm.getSubKey("0001100000001101001000111001100001111010101100101110101011111101"))
    .toBe("0101010011111010000000000001100000010111100100111001001101100100");
  expect(algorithm.getSubKey("☮")).toBe("0010011011010000100100100010110000001111100100000001101000001010");
});

test('Feistel - makeRound', () => {
  expect(typeof algorithm.makeRound).toBe("function");
  expect(typeof algorithm.makeRound("22", "33", "44")).toBe("object");
});

test('Feistel - divideEvenly', () => {
  expect(algorithm.divideEvenly("Patryk")).toStrictEqual(["Pat", "ryk"]);
  expect(algorithm.divideEvenly("Feistel")).toStrictEqual(["Fei", "stel"]);
  expect(typeof algorithm.divideEvenly("Feistel")).toStrictEqual("object");
});

test('Feistel - processSingleBlock', () => {
  expect(typeof algorithm.processSingleBlock).toBe("function");
  expect(typeof algorithm.processSingleBlock("encrypt", "22")).toBe("string");
});

test('Feistel - divideIntoBlocks', () => {
  expect(algorithm.divideIntoBlocks("Niedziela 23.05.2021 21:21 today")).toStrictEqual(["Niedziel", "a 23.05.", "2021 21:", "21 today"]);
});

test('Feistel - process', () => {
  expect(typeof algorithm.process).toBe("function");
  expect(typeof algorithm.process("encrypt", "22")).toBe("string");
});