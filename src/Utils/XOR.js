export const getBitWiseFunc = (operator) => {
  return (string1, string2) => Array.from(string1).map((c, idx) => operator(c, string2[idx])).join('')
}