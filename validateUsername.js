function validUsername(username) {
    const validLength = username.length >= 6 && username.length <= 30
    let isValid = /^[a-zA-Z0-9.]+$/g.test(username)

    return validLength && isValid
}
module.exports = validUsername