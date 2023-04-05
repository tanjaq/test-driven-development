const validateUsername = require('./validateUsername')

test('return false for empty username', () => {
    expect(validateUsername('')).toBe(false)
})
test('return false for username < 6 characters', () => {
    expect(validateUsername('a123')).toBe(false)
})
test('return false for username > 30 characters', () => {
    expect(validateUsername('QWERTYTWTWTWOSDAODSADOASDOQWERTYOPO')).toBe(false)
})
test('return true for username = 6 characters', () => {
    expect(validateUsername('QWERTY')).toBe(true)
})
test('return true for username = 30 characters', () => {
    expect(validateUsername('QWERTYTWTWTWOSDAODSADOASDOQWER')).toBe(true)
})
test('return true for username >= 6 chars, with numbers', () => {
    expect(validateUsername('Qwerty22')).toBe(true)
})
test('return true for username <= 30 chars, with numbers', () => {
    expect(validateUsername('QWERTYTWTWTWOSDAODSADOASDOQW22')).toBe(true)
})
test('return true for username >= 6 chars, with numbers and periods', () => {
    expect(validateUsername('Qwerty22..')).toBe(true)
})
test('return true for username <= 30 chars, with numbers and periods', () => {
    expect(validateUsername('QWERTYTWTWTWOSDAODSADOASDOQ.22')).toBe(true)
})
