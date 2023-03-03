function validPass(pass)
{
    let moreThan8Chars = pass.length >= 8;
    let hasNumber = /[0-9]/g.test(pass);
    let hasLowerCase = /[a-z]/g.test(pass);
    let hasUpperCase = /[A-Z]/g.test(pass);
    let hasSpecialChars = /[!-\/:-@[-`{-~]/g.test(pass);


    return moreThan8Chars && hasNumber && hasLowerCase && hasUpperCase && !hasSpecialChars;
}

module.exports = validPass;