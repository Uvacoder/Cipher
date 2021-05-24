import { render, fireEvent, waitFor } from '@testing-library/react';
import Main from './Main';

const SECRET_KEY = 'eldorado';
const PLAIN_TEXT = 'carrot\ntest\twith\ttabs\nand ęźćńł'
const CIPHER = 'RiY3eTh9aSDIF5jP6WyU7EAmJXk+fRIg1heXz5Fs8+wsJiJ5K315IL4X88+RbJ7sQSZ2eVN8YSGnFunOymzr7Q==';

const setup = () => {
  const utils = render(<Main useAuth={false}/>);
  const input = document.querySelector('.main__input textarea');
  const output = document.querySelector('.main__output textarea');
  const encryptBtn = document.querySelector('.main__buttons-encode')
  const decryptBtn = document.querySelector('.main__buttons-decode');
  const keyInput = document.querySelector('.main__properties-key input');

  return {
    input,
    output,
    encryptBtn,
    decryptBtn,
    keyInput,
    ...utils
  }
}

const setInputValue = async (input, value) => {
  expect(input.value).toBe('');

  await waitFor(() => {
    fireEvent.change(input, { target: { value } });
  });

  expect(input.value).toBe(value);
}

test('UI - Encryption', async () => {
  const { input, output, encryptBtn, keyInput } = setup();

  await setInputValue(input, PLAIN_TEXT)
  await setInputValue(keyInput, SECRET_KEY)
  await waitFor(() => {
    fireEvent.click(encryptBtn);
  });

  expect(output.value).toBe(CIPHER);
});

test('UI - Decryption', async () => {
  const { input, output, decryptBtn, keyInput } = setup();

  await setInputValue(input, CIPHER)
  await setInputValue(keyInput, SECRET_KEY)
  await waitFor(() => {
    fireEvent.click(decryptBtn);
  });

  expect(output.value).toBe(PLAIN_TEXT);
});