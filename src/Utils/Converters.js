// TODO change names to 16bit
// todo change ascii to utf16

export const textToAsciiArray = (text) => {
  return text.split('').map(letter => letter.charCodeAt(0))
}

export const decimalToBinary = (decimal, bits) => {
  const binary = decimal.toString(2);

  return '0'.repeat(bits - binary.length) + binary;
}

export const textToBinary = (textInput, bits) => {
  // return (
  //   Array
  //     .from(textInput)
  //     .reduce((acc, char) => acc.concat(char.charCodeAt().toString(2)), [])
  //     .map(bin => '0'.repeat(bits - bin.length) + bin )
  //     .join('')
  // );
  const asciiArray = textToAsciiArray(textInput);

  return asciiArray.map(value => decimalToBinary(value, bits)).join('');
}

export const binaryToText = (binaryInput, bits) => {
  const regex = new RegExp(`.{1,${bits}}`, 'g');

  return binaryInput.match(regex).map((el) => String.fromCharCode((parseInt(el, 2)))).join('')
  // return binaryInput.match(/.{1,16}/g).map((el) => String.fromCharCode((parseInt(el, 2)))).join('')
}

// convert a Unicode string to a string in which
// each 16-bit unit occupies only one byte
export const unicodeTo8BitBinary = (string) => {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
}

// a string that contains characters occupying > 1 byte

export const from8BitBinaryToUnicode = (binary) => {
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

export const UTF16ToBase64 = (utf16) => {
  const converted = unicodeTo8BitBinary(utf16);
  return btoa(converted);
}

export const base64ToUTF16 = (base64) => {
  const decoded = atob(base64);
  return from8BitBinaryToUnicode(decoded);
}