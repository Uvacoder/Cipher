/**
 * Util returning function that uses bitwise operators
 * @category Utils
 * @method
 * @param {Function} operator Encrypting function definition
 * @returns {Function} Encrypting function
 */
export const getBitWiseFunc = (operator) => {
  return (string1, string2) => Array.from(string1).map((c, idx) => operator(c, string2[idx])).join('')
}