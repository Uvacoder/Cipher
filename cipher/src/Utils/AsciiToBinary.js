export default function convert(text) {
  return (
    Array
      .from(text)
      .reduce((acc, char) => acc.concat(char.charCodeAt().toString(2)), [])
      .map(bin => '0'.repeat(8 - bin.length) + bin )
      .join('')
  );
}