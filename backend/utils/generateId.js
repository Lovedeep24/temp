const crypto = require("crypto");

function generateId() {
  const timestamp = Math.floor(Date.now() / 1000).toString(16); 
  const randomBytes = crypto.randomBytes(8).toString("hex"); 
  return timestamp + randomBytes;
}

module.exports = generateId;