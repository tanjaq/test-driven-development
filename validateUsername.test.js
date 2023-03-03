const validateUsername = require('./validateUsername')

test("return false for empty username", () => {
    expect(validateUsername("")).toBe(false)
})
test("return false for username > 6 characters", () => {
    expect(validateUsername("a123")).toBe(false)
})
test("return false for username < 30 characters", () => {
    expect(validateUsername("a123klfxljsdjkeh2io4i43oieiw2kjipfsi24osifs")).toBe(false)
})
test("return true for username = 7 characters", () => {
    expect(validateUsername("QA12ws4")).toBe(true)
})
test("return true for username = 6 characters", () => {
    expect(validateUsername("QWE1as")).toBe(true)
})
test("return true for username => 8 characters", () => {
    expect(validateUsername("QWERTYas34")).toBe(true)
})
test("return true for username > 9 characters, with period", () => {
    expect(validateUsername("a123.fssr.qwu2")).toBe(true)
})
test("return true for username => 8 characters, no numbers", () => {
    expect(validateUsername("QWERTYUIui")).toBe(true)
})
test("return true for username => 8 characters, no lowercase", () => {
    expect(validateUsername("ASDQWE123")).toBe(true)
})
test("return true for username => 8 characters, no uppercase", () => {
    expect(validateUsername("asdqweq123")).toBe(true)
})
test("return true for username => 8 characters, no letters", () => {
    expect(validateUsername("657657657")).toBe(true)
})
test("return false for username with special characters", () => {
    expect(validateUsername("asdq&*()123")).toBe(false)
})