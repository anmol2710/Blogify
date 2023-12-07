const JWT = require("jsonwebtoken")
const secret = "!@#$%^&*())(*&^%$#@!@#$%^&*()(*&^%$#@!Anmol";
function createUser(name , email){
    return JWT.sign({
        name:name,
        email:email
    },secret)
}

function validateUser(token){
    return JWT.verify(token,secret)
}

module.exports = {
    createUser , 
    validateUser
}