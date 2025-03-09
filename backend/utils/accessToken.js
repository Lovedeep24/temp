const crypto = require("crypto");
const path = require('path');
const readFile = require('./readFile');
const { read } = require("fs");
const tokenFilePath = path.join(__dirname, "../database/accessToken.json");

function generateAccessToken(userId, role) {
  const randomBytes = crypto.randomBytes(8).toString("hex");
  const timestamp = Date.now();
  const data = `${userId}:${role}:${randomBytes}:${timestamp}`;
  return Buffer.from(data).toString("base64");
}

function decodeAccessToken(token) {
  try {
    const decodedData = Buffer.from(token, "base64").toString("utf8");
    const [userId, role, randomBytes, timestamp] = decodedData.split(":");
    return { userId, role, randomBytes, timestamp: new Date(Number(timestamp)) };
  } catch (error) {
    return { error: "Invalid or tampered token" };
  }
}

function verifyToken(token){
  try {
    const AccessToken = readFile(tokenFilePath);
    const exist = AccessToken.tokens.find(t => t.accessToken === token);
    if(!exist){
      return {error: "Invalid or expired token."};
    }
    return exist.userId;
  } catch (error) {
    return {error: "Internal server error"};
  }
}

module.exports = { generateAccessToken, decodeAccessToken, verifyToken };
