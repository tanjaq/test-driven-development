function validUsername(username) {
    const validLength = username.length >= 6 && username.length <= 30
    let hasPeriod = /^[a-zA-Z\d\.]+$/g.test(username)

    return validLength && hasPeriod
}
module.exports = validUsername