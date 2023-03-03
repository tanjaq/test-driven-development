const validUsername= require('./validUsername')

test("return false for empty username", () => {
    expect(validUsername("")).toBe(false)
})

test("return false for username < 6 characterss", () => {
    expect(validUsername("ads3")).toBe(false)
})
test("return false for username > 30 characters", () => {
    expect(validUsername("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")).toBe(false)
})
test("return true for Username with letters, numbers, and periods.", () => {
    expect(validUsername("ASDDFGHJKL.dff")).toBe(true)
})