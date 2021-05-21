import { CHARSET } from './StringActions'

export const xor = (string1, string2) => {
  // console.log(Array.from(string1).reduce((xored, c, idx) => c.charCodeAt(0) ^ string2.charCodeAt(idx)))
  // return Array.from(string1).reduce((xored, c, idx) => xored + String.fromCharCode(c.charCodeAt(0) ^ string2.charCodeAt(idx)), '')
  // const added = Array.from(string1).reduce((addedString, c, idx) => addedString + String.fromCharCode(c.charCodeAt(0) + string2.charCodeAt(idx)), '')
  // return Array.from(string1).reduce((xored, c, idx) => xored + CHARSET.charAt(c.charCodeAt(0) ^ string2.charCodeAt(idx)), '')

  return Array.from(string1).map((c, idx) => (c ^ string2[idx])).join('')
}