import { getBitWiseFunc } from '../Utils/BitwiseFunction'

test('Bitwise Functions - test', () => {
  expect(getBitWiseFunc((a, b) => a ^ b)("1", "0")).toBe("1");
  expect(getBitWiseFunc((a, b) => a ^ b)("Patryk Bura", "Horst Feistel")).toBe("00000000000");
  expect(getBitWiseFunc((a, b) => a ^ b)("11", "01")).toBe("10");
});

