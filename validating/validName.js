function validName(name)
{
    let moreThan5Chars = name.length > 5;
    let lessThan31Chars = name.length < 31;
    let HasNotInvalidSymbols = /[^A-Za-z0-9\.]/g.test(name);



    return moreThan5Chars && lessThan31Chars && !HasNotInvalidSymbols;
}

module.exports = validName;