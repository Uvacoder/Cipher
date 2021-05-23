/**
 * Object containing bitwise function used as encoding functions.
 * @category Constants
 * @constant
 * @method
 * @type {Object} 
 * @param {Function} BITWISE_FUNCTIONS.XOR Exclusive OR
 * @param {Function} BITWISE_FUNCTIONS.OR Bitwise OR
 * @param {Function} BITWISE_FUNCTIONS.AND Bitwise AND
 * @param {Function} BITWISE_FUNCTIONS.Signed_right_shift Bitwise signed right shift
 * @param {Function} BITWISE_FUNCTIONS.Zeros_fill_right_shift Bitwise zeros fill right shift
 */
const BITWISE_FUNCTIONS = Object.freeze({
  'XOR': (a, b) => a ^ b,
  'OR': (a, b) => a | b,
  'AND': (a, b) => a & b,
  'Signed right shift': (a,b) => a >> b,
  'Zeros fill right shift': (a,b) => a >>> b
})

export default BITWISE_FUNCTIONS