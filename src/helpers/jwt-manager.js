const jwt = require("jsonwebtoken");
const crypto = require("node:crypto");

class TokenService {
  constructor() {
    this.secretKey = "Y,%c9G&``!Q~`k#";
    this.key = crypto.randomBytes(16);
    this.iv = Buffer.from(this.secretKey);
    this.accessTokenExpiryTime = "3600s";
    this.refreshTokenExpiryTime = "2592000s"; // 1 month in seconds
  }
  encrypt(payload) {
    const cipher = crypto.createCipheriv("aes-128-ocb", this.key, this.iv, { authTagLength: 16 });
    let encryptedPayload = cipher.update(JSON.stringify(payload), "utf8", "base64");
    encryptedPayload += cipher.final("base64");
    return {payload: encryptedPayload};
  }

  decrypt(encryptedPayload) {
    const decipher = crypto.createDecipheriv("aes-128-ocb", this.key, this.iv, { authTagLength: 16 });
    let decryptedPayload = decipher.update(encryptedPayload, "base64", "utf8");
    decryptedPayload += decipher.final("utf8");
    return JSON.parse(decryptedPayload);
  }

  generateAccessToken(payload) {
    return jwt.sign(this.encrypt(payload), this.secretKey, { expiresIn: this.accessTokenExpiryTime });
  }

  generateRefreshToken(payload) {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.refreshTokenExpiryTime });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      return null;
    }
  }
}
const tokenService = new TokenService();

// Generate an access token
const accessToken = tokenService.generateAccessToken({ userId: 123, username: "example_user" });
console.log("Access Token:", accessToken);

// Generate a refresh token
// const refreshToken = tokenService.generateRefreshToken({ userId: 123 }, "7d");
// console.log("Refresh Token:", refreshToken);

// Verify and decode tokens
const decodedAccessToken = tokenService.verifyToken(accessToken);
// const decodedRefreshToken = tokenService.verifyToken(refreshToken);

console.log("Decoded Access Token:", decodedAccessToken);
// console.log("Decoded Refresh Token:", decodedRefreshToken);
