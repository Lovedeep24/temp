const crypto = require("crypto");

function hashPassword(password){
    const salt = crypto.randomBytes(16).toString('hex');
    const key = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return { salt, hashedPassword: key };
}

function verifyPassword(password, hashedPassword, salt) {
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return hash === hashedPassword; 
}

module.exports = { hashPassword, verifyPassword };