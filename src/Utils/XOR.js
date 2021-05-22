export const xor = (string1, string2) => {
  return Array.from(string1).map((c, idx) => (c ^ string2[idx])).join('')
}