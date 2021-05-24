/**
 * Object containing bitwise function used as encoding functions.
 * @category Constants
 * @constant
 * @method
 * @type {Object} 
 * @property {Function} BITWISE_FUNCTIONS.XOR Exclusive OR
 * @property {Function} BITWISE_FUNCTIONS.OR Bitwise OR
 * @property {Function} BITWISE_FUNCTIONS.AND Bitwise AND
 * @property {Function} BITWISE_FUNCTIONS.Signed[]right[]shift Bitwise signed right shift
 */
const BITWISE_FUNCTIONS = Object.freeze({
  'XOR': (a, b) => a ^ b,
  'OR': (a, b) => a | b,
  'AND': (a, b) => a & b,
  'Signed right shift': (a,b) => a >> b
})

export default BITWISE_FUNCTIONS