const validPass = require('./validating/validName.js');

test("return false for empty value", () => {
    expect(validPass("")).toBe(false);
});
