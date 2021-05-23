import { v4 as uuidv4 } from 'uuid';
/**
 * 
 * @returns Random master key
 */
export const generateKey = () => {
  return uuidv4()
}