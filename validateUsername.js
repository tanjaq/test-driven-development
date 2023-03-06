function validUsername(username){
    if(username instanceof String){
        return false;
    }
    const validLength = (username.length >= 6 && username.length <= 30 )
    const hasLettersNumbersAndPeriods = /^[A-Za-z0-9.]+$/g.test(username);

    return validLength && hasLettersNumbersAndPeriods;
}

module.exports = validUsername;