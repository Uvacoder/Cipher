import { 
  textToUnicodeDecimalArray,
  textToBinary,
  binaryToText, 
  decimalToBinary, 
  unicodeTo8BitBinary,
  from8BitBinaryToUnicode,
  UTF16ToBase64, 
  base64ToUTF16 
} from "../Utils/Converters"

test('Converter - textToUnicodeDecimalArray', () => {
  expect(textToUnicodeDecimalArray("Hello")).toStrictEqual([72, 101, 108, 108, 111]);
  expect(textToUnicodeDecimalArray("ĄĘĆŻółŁ")).toStrictEqual([260, 280, 262, 379, 243, 322, 321]);
  expect(textToUnicodeDecimalArray("🤣🤣❤❤❤😂😂"))
    .toStrictEqual([55358, 56611, 55358, 56611, 10084, 10084, 10084, 55357, 56834, 55357, 56834]);
  expect(textToUnicodeDecimalArray("ŴWÛ∇ↈↂ≧≞⨌χ"))
    .toStrictEqual([372, 87, 219, 8711, 8584, 8578, 8807, 8798, 10764, 967]);
  expect(textToUnicodeDecimalArray("(☞ﾟヮﾟ)☞☜(ﾟヮﾟ☜)"))
    .toStrictEqual([40, 9758, 65439, 12526, 65439, 41, 9758, 9756, 40, 65439, 12526, 65439, 9756, 41]);
});

test('Converter - decimalToBinary', () => {
  expect(decimalToBinary(50)).toBe("110010");
  expect(decimalToBinary(373737373737)).toBe("101011100000100011110111100000000101001");
  expect(decimalToBinary("2")).toBe("2");
});

test('Converter - textToBinary', () => {
  expect(textToBinary("Róża czerowna, biało kwitnie bez"))
    .toBe("10100101111001110111110011000011000001100011111101011001011110010110111111101111101110110000110110010000011000101101001110000110100001011011111000001101011111011111010011110100110111011010011100101100000110001011001011111010");
  expect(textToBinary("😎🥱😴"))
    .toBe("110110000011110111011110000011101101100000111110110111010111000111011000001111011101111000110100");
});

test('Converter - binaryToText', () => {
  expect(binaryToText("100101010100111", 16)).toBe("䪧");
  expect(binaryToText("110110000011110111011110000011101101100000111110110111010111000111011000001111011101111000110100", 16))
    .toBe("😎🥱😴");
});

test('Converter - unicodeTo8BitBinary', () => {
  expect(unicodeTo8BitBinary("100")).toBe("1\u00000\u00000\u0000");
});

test('Converter - from8BitBinaryToUnicode', () => {
  expect(from8BitBinaryToUnicode("1010011110")).toBe("〱〱㄰ㄱ〱");
});

test('Converter - UTF16ToBase64', () => {
  expect(UTF16ToBase64("https://github.com/patrykbura")).toBe("aAB0AHQAcABzADoALwAvAGcAaQB0AGgAdQBiAC4AYwBvAG0ALwBwAGEAdAByAHkAawBiAHUAcgBhAA==");
  expect(UTF16ToBase64("https://www.movielounge.pl/")).toBe("aAB0AHQAcABzADoALwAvAHcAdwB3AC4AbQBvAHYAaQBlAGwAbwB1AG4AZwBlAC4AcABsAC8A");
});

test('Converter - base64ToUTF16', () => {
  expect(base64ToUTF16("aAB0AHQAcABzADoALwAvAGcAaQB0AGgAdQBiAC4AYwBvAG0ALwBwAGEAdAByAHkAawBiAHUAcgBhAA==")).toBe("https://github.com/patrykbura");
  expect(base64ToUTF16("aAB0AHQAcABzADoALwAvAHcAdwB3AC4AbQBvAHYAaQBlAGwAbwB1AG4AZwBlAC4AcABsAC8A")).toBe("https://www.movielounge.pl/");
});
