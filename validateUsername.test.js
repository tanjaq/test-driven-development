const validateUsername = require('./validateUsername');

test("return false for empty username", () => {
    expect(validateUsername("")).toBe(false)
})

test("return false for username < 6 characters", () => {
    expect(validateUsername("a123")).toBe(false)
})

test("return false for username > 30 characters", () => {
    expect(validateUsername("123456789012345678901234567890qwerty")).toBe(false)
})

test("return true for username > 6 < 30 characters, uppercase", () => {
    expect(validateUsername("QWERTYUIOOP")).toBe(true)
})

test("return true for username > 6 < 30 characters, lowercase", () => {
    expect(validateUsername("qwertyuiop")).toBe(true)
})

test("return true for username > 6 < 30 characters, uppercase and lowercase", () => {
    expect(validateUsername("QWERTYuiop")).toBe(true)
})

test("return true for username > 6 < 30 characters, uppercase, lowercase and period", () => {
    expect(validateUsername("QW.ERTYuiop")).toBe(true)
})

test("return false for username > 6 < 30 characters, special characters", () => {
    expect(validateUsername("QW.ERTY#uiop/%$#@")).toBe(false)
})
