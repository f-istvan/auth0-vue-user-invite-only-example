const generatePassword = function () {
    let config = {
        lowercaseLength: 4,
        uppercaseLength: 4,
        numbersLength: 2
    };
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let uppercase = lowercase.toUpperCase();
    let numbers = "0123456789";
    
    let password = getNRandomCharsFromCharset(lowercase, config.lowercaseLength);
    password += getNRandomCharsFromCharset(uppercase, config.uppercaseLength);
    password += getNRandomCharsFromCharset(numbers, config.numbersLength);
    
    return shuffle(password);
}
  
const shuffle =  function (inputString) {
    console.log(inputString)
    return inputString.split('').sort(() => {
        return 0.5-Math.random()
    }).join('');
}

const getNRandomCharsFromCharset = function (charset, n) {
    let nRandomChar = "";
    let charSetLength = charset.length
    while (n > 0) {
        nRandomChar += charset.charAt(Math.floor(Math.random() * charSetLength));
        n--;
    }
    return nRandomChar;
}

module.exports = {
    generatePassword: generatePassword
}