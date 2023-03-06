const validPass = require('./validating/validName.js');

test("return false for empty value", () => {
    expect(validPass("")).toBe(false);
});

test("return false if name < 6 chars", () => {
    expect(validPass("rgre")).toBe(false);
});

test("return false if name > 30 chars", () => {
    expect(validPass("fndigirofmbnfjgoekgjreigmejgijeigoejgioelfjfo")).toBe(false);
});

test("return false if name has symbols instaed characters, numbers and '.'", () => {
    expect(validPass("fnFigirofm.bn%fjgoekgjreigm")).toBe(false);
});
