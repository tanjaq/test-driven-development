const validatePassword = require('./validatePassword')

test('return false for empty password', () => {
    expect(validatePassword('')).toBe(false)
})
test('return false for password < 8 characters', () => {
    expect(validatePassword('a123')).toBe(false)
})
test('return true for password > 8 characters', () => {
    expect(validatePassword('QWERTYs123')).toBe(true)
})
test('return true for password = 8 characters', () => {
    expect(validatePassword('Qwerty23')).toBe(true)
})
test('return false for password >= 8 chars, no numbers', () => {
    expect(validatePassword('Qwertyasdsad')).toBe(false)
})
test('return false for password >= 8 chars, no uppercase', () => {
    expect(validatePassword('qwerty1234')).toBe(false)
})

test('return true for password >= 8 chars, no lowercase', () => {
    expect(validatePassword('QWERTY1234')).toBe(false)
})

test('return false for password >= 8 chars, no numbers, no uppercase', () => {
    expect(validatePassword('qwertyasdsad')).toBe(false)
})
test('return false for password >= 8 chars, no numbers, no lowercase', () => {
    expect(validatePassword('QWERTYUOASPD')).toBe(false)
})
test('return false for password with special characters', () => {
    expect(validatePassword('QWERTY1234$€£@@')).toBe(false)
})