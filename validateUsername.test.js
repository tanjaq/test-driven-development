const validateUsername = require('./validateUsername')

test("return false for empty username", () => {
    expect(validateUsername("")).toBe(false)
})
test("return false for username < 6 characters", () => {
    expect(validateUsername("a123")).toBe(false)
})
test("return false for username = 5 characters", () => {
    expect(validateUsername("QA12w")).toBe(false)
})
test("return true for username = 6 characters", () => {
    expect(validateUsername("QWE123")).toBe(true)
})
test("return true for username => 6 characters", () => {
    expect(validateUsername("QWERTYas34")).toBe(true)
})
test("return false for username > 30 characters", () => {
    expect(validateUsername("QA12ws4QA12ws4QA12ws4QA12ws4QA12ws4")).toBe(false)
})
test("return false for username = 31 characters", () => {
    expect(validateUsername("QA12ws4QA12ws4QA12ws4QA12ws4QA1")).toBe(false)
})
test("return true for username = 30 characters", () => {
    expect(validateUsername("QA12ws4QA12ws4QA12ws4QA12ws4QA")).toBe(true)
})
test("return true for username => 6 characters and pariod characters", () => {
    expect(validateUsername("QWE..Yas34")).toBe(true)
})
test("return true for username =< 30 characters and pariod characters", () => {
    expect(validateUsername("QWE..Yas34")).toBe(true)
})
test("return false for username < 6 characters and pariod characters", () => {
    expect(validateUsername("X..XX")).toBe(false)
})
test("return false for username > 30 characters and pariod characters", () => {
    expect(validateUsername("QA12ws4QA1.2ws4QA12ws4QA12.ws4QA12ws4")).toBe(false)
})
test("return false for username with special characters", () => {
    expect(validateUsername("asdQW&*()123")).toBe(false)
})