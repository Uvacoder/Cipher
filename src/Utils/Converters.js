/**
 * Creates array of unicodes from passed in text
 * @method
 * @param {String} text 
 * @returns Array of Unicodes
 */
export const textToUnicodeDecimalArray = (text) => {
  return text.split('').map(letter => letter.charCodeAt(0))
}

/**
 * Decimal number to binary representation in string converter
 * @method
 * @param {Number} decimal 
 * @param {Number} bits Bit format
 * @returns Binary string representing decimal
 */
export const decimalToBinary = (decimal, bits) => {
  const binary = decimal.toString(2);

  return '0'.repeat(bits - binary.length) + binary;
}

/**
 * Text to binary represented in string converter
 * @method
 * @param {String} textInput 
 * @param {Number} bits Bit format
 * @returns Binary representation of text in string
 */
export const textToBinary = (textInput, bits) => {
  const unicodeArray = textToUnicodeDecimalArray(textInput);

  return unicodeArray.map(value => decimalToBinary(value, bits)).join('');
}

/**
 * Converts binary input to readable text
 * @method
 * @param {String} binaryInput String of 0s & 1s
 * @param {Number} bits Bit format
 * @returns Readable string
 */
export const binaryToText = (binaryInput, bits) => {
  const regex = new RegExp(`.{1,${bits}}`, 'g');

  return binaryInput.match(regex).map((el) => String.fromCharCode((parseInt(el, 2)))).join('')
}


/**
 * convert a Unicode string to a string in which
 * each 16-bit unit occupies only one byte
 * @method
 * @param {String} string Unciode string 
 * @returns 8 Bit binary string
 */
export const unicodeTo8BitBinary = (string) => {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
}

/**
 * conver 8 Bit binary string to Unicode string
 * @method
 * @param {String} binary string of binary chars
 * @returns unicode string
 */
export const from8BitBinaryToUnicode = (binary) => {
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

/**
 * Convert UTF16 to Base64
 * @method
 * @param {String} utf16 String in UTF16 format
 * @returns String in Base64 format
 */
export const UTF16ToBase64 = (utf16) => {
  const converted = unicodeTo8BitBinary(utf16);
  return btoa(converted);
}

/**
 * Convert Base64 to UTF16
 * @method
 * @param {String} base64 String in Base64 format 
 * @returns String in Base64 format
 */
export const base64ToUTF16 = (base64) => {
  const decoded = atob(base64);
  return from8BitBinaryToUnicode(decoded);
}