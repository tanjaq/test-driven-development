/**
 * Validate a password
 * @param {int} pass user password.
 * @return {bool} return true or false depending on the valid of pass.
* */
function validPass(pass) {
  const moreThan8Chars = pass.length >= 8;
  const hasNumber = /[0-9]/g.test(pass);
  const hasLowerCase = /[a-z]/g.test(pass);
  const hasUpperCase = /[A-Z]/g.test(pass);
  const hasSpecialChars = /[!-\/:-@[-`{-~]/g.test(pass);


  return moreThan8Chars && hasNumber &&
   hasLowerCase && hasUpperCase && !hasSpecialChars;
}

module.exports = validPass;
