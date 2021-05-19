export default function convert(input) {
  return input.split('').map((char) => {
    return char.charCodeAt(0).toString(2);
  }).join('');
}