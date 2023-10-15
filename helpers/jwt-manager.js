const jwt = require("jsonwebtoken");
const secret = "U@QwzN2UNtMp2Hf4+6UC"
const access_token_expiry_time = process.env.ACCESS_TOKEN_EXPIRY_TIME
class JwtManager {
  constructor() {
    this.jwtSecret = secret;
    this.accessTokenExpiry = access_token_expiry_time;
    this.refreshTokenExpiryTime;
  }
  generateToken(user, tokenExpiryTime) {
    return new Promise((resolve, reject) => {
      const tokenPayload = { userId: user._id };
      //create a 1 hour expiry time for the JWT
      var expiresIn = "3600s";
      try {
        let signedJwt = jwt.sign({ payload: tokenPayload }, this.jwtSecret, { expiresIn });
        resolve({ status: 200, message: "JWT generated successfully", data: { accessToken: signedJwt } });
        resolve(signedJwt);
      } catch (e) {
        reject("Error while generating token");
      }
    });
  }
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      if (!token || !this.isValid(token)) reject("Invalid Token");
      else {
        console.log(`verifying ${token}`);
        jwt.verify(token, "<PASSWORD>", function (err, decodedData) {
          if (err) reject(err);
          resolve({ status: "success", message: "verified" });
        });
      }
    });
  }
}

module.exports = new JwtManager();

module.exports.generateToken = (payload) => {
  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });
};
