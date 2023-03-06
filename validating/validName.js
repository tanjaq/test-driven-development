/**
 * Validate a password
 * @param {int} name user name.
 * @return {bool} return true or false depending on the valid of name.
 * */
function validName(name) {
  const moreThan5Chars = name.length > 5;
  const lessThan31Chars = name.length < 31;
  const HasNotInvalidSymbols = /[^A-Za-z0-9\.]/g.test(name);

  return moreThan5Chars && lessThan31Chars && !HasNotInvalidSymbols;
}

module.exports = validName;
