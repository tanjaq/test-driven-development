const validateUserInput = require('./validateUserInput');

test('validateUserInput returns false for empty username', () => {
    // 'ads3' as input, as this input has less than 6 characters and contains characters that are not letters, numbers, or periods.
  const result = validateUserInput('');
  expect(result).toBe(false);
});

test('validateUserInput returns false for username less than 6 characters', () => {
  const result = validateUserInput('ads3');
  expect(result).toBe(false);
});

test('validateUserInput returns false for username greater than 30 characters', () => {
    // generate 31 with letter a
  const result = validateUserInput('a'.repeat(31));
  expect(result).toBe(false);
});

test('validateUserInput returns true for username with letters, numbers, and periods', () => {
    //'ASDDFGHJKL.dff' as input, as this input has at least 6 characters and only contains letters, numbers, and periods.
  const result = validateUserInput('ASDDFGHJKL.dff');
  expect(result).toBe(true);
});
