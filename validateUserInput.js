function validateUserInput(username)
{
    const validUserLength = username.length >= 6 && username.length <= 30
    let incorrectChars = /^[a-zA-Z0-9.]+$/g.test(username)
    return validUserLength && incorrectChars

}

module.exports = validateUserInput