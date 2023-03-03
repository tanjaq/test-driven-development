function validUsername(username) {
    const validLength = username.length >= 6 &&  username.length <= 30;
    let specialCharachters = /^[a-zA-Z0-9.]+$/g.test(username)
    //let allowedText = /^[A-Za-z0-9_-]*$/g.test(username)

    return validLength && specialCharachters
}

module.exports = validUsername