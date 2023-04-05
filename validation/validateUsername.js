function validateUsername(username){
    const validLength = username.length >= 6 && username.length <= 30;
    let hasNumber = /[0-9]*/g.test(username);
    let hasLetters = /[A-Za-z]*/g.test(username);
    let hasPeriods = /[.]*/g.test(username);
    return validLength && hasNumber && hasLetters && hasPeriods;
};

module.exports = validateUsername;