import { v4 as uuidv4 } from 'uuid';
/**
 * Generates random key using uuid
 * Can be changed to any ranom string generator.
 * @category Utils
 * @method
 * @returns {String} Random master key
 */
export const generateKey = () => {
  return uuidv4()
}

window.generateKey =  generateKey