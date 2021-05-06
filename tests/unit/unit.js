const randString = require("../../src/utils/oauths/general")
const boom = require("@hapi/boom")



const testRandString = (number) => { 
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // prettier-ignore
    const randomString = randString(number)
    if(randomString.length !== number) return boom.conflict("The string's length does not match the parameter")
    for (let index = 0; index < number; index++) {
        if(!possibleChars.includes(randomString[index])) return boom.conflict("String does not match the possible characters")
    }
    return `todo cool`
}

console.log(testRandString(10))