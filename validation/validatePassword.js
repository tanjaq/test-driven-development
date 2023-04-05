function validatePassword(password){
  const validLength = password.length >= 8;
  let hasNumber = /[0-9]/g.test(password);
  let hasUpperCase = /[A-Z]/g.test(password); 
  let hasLowerCase = /[a-z]/g.test(password); 
  var hasSpecialCharacter = /[^\w\s]/g.test(password); // exclude special characters

  if (hasSpecialCharacter) {
      return false;
  }
  return validLength && hasNumber && hasUpperCase && hasLowerCase;
};

module.exports = validatePassword;