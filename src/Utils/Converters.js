// TODO change names to 16bit

export const textToBinary = (textInput) => {
  return (
    Array
      .from(textInput)
      .reduce((acc, char) => acc.concat(char.charCodeAt().toString(2)), [])
      .map(bin => '0'.repeat(16 - bin.length) + bin )
      .join('')
  );
}

export const binaryToText = (binaryInput) => {
  return binaryInput.match(/.{1,16}/g).map((el) => String.fromCharCode((parseInt(el, 2)))).join('')
}