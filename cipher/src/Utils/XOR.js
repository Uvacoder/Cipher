import { CHARSET } from './StringActions'

export const xor = (string1, string2) => {
  console.log(Array.from(string1).reduce((xored, c, idx) => c.charCodeAt(0) ^ string2.charCodeAt(idx)))
  return Array.from(string1).reduce((xored, c, idx) => xored + CHARSET.charAt(c.charCodeAt(0) ^ string2.charCodeAt(idx)), '')
}