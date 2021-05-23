import { v4 as uuidv4 } from 'uuid';

export const generateKey = () => {
  const k = uuidv4()
  console.log(k)
  return k;
}