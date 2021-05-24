import { generateKey } from 'Utils/KeyGenerator'

test('Key Generator - test', () => {
  expect(generateKey()).toHaveLength(36);
});

