import { v4 as uuidv4 } from 'uuid';

export const generateKey = (length) => {
  const key = uuidv4();
  const keyLength = key.length;

  if (keyLength >= length) {
    return key.substr(1, length)
  }

  return key.repeat(Math.ceil(length / keyLength))
}

export const checkLenghtAndFix = (key, length) => {
  if (key.length === length) {
    return key
  } else if (key.length > length) {
    return key.substr(1, length)
  }

  return key.repeat(Math.ceil(length / key.length))
}