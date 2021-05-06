const randString = require("../../src/utils/oauths/general")
const googleString = require("../../src/utils/oauths/google")
const boom = require("@hapi/boom")



const testRandString = (number) => { 
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // prettier-ignore
    const randomString = randString(number)
    if(randomString.length !== number) return boom.conflict("The string's length does not match the parameter")
    for (let index = 0; index < number; index++) {
        if(!possibleChars.includes(randomString[index])) return boom.conflict("String does not match the possible characters")
    }
    return `👍`
}

const testGoogleString = () => {
    const txt = googleString()
    if(txt !== "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https%3A%2F%2Fmarvelappplatzimaster.herokuapp.com%2Fapi%2Foauth%2Fregister&client_id=&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email"){
        return boom.conflict("The string does not match the intended url")
    }
    else {
      return  `👍`
    }
}

console.log(testRandString(10))
console.log(testGoogleString())