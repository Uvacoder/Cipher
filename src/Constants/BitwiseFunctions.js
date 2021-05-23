/**
 * @constant
 * @type {Object} Object containing bitwise function used as encoding functions.
 */
const BITWISE_FUNCTIONS = Object.freeze({
  'XOR': (a, b) => a ^ b,
  'OR': (a, b) => a | b,
  'AND': (a, b) => a & b,
  'Signed right shift': (a,b) => a >> b,
  'Zeros fill right shift': (a,b) => a >>> b
})

export default BITWISE_FUNCTIONS