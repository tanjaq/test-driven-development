const validPass = require('./validating/validPass.js');

test("return false for empty value", () => {
    expect(validPass("")).toBe(false);
});

test("return false for password < 8 chars", () => {
    expect(validPass("a123")).toBe(false);
});



test("return false for password = 7 charchters", () => {
    expect(validPass("Qwe123R")).toBe(false);
});

test("return true for password = 8 charchters", () => {
    expect(validPass("Qwe123RE")).toBe(true);
});

test("return true for password => 8 charchters", () => {
    expect(validPass("Qwe123REQ")).toBe(true);
});




test("return false for password => 8 chars, no numbers", () => {
    expect(validPass("QWERTYUIui")).toBe(false);
});


test("return false for password => 8 chars, no lowercase", () => {
    expect(validPass("QWERTYUIFKFK")).toBe(false);
});


test("return false for password => 8 chars, no uppercase", () => {
    expect(validPass("ccccccccc")).toBe(false);
});

test("return false for password with special characters", () => {
    expect(validPass("123()//#*||\\")).toBe(false);
});