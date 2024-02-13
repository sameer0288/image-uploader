import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.JWT_SECRET;

const generateToken = (userId) => {
  if (!secretKey) {
    throw new Error(
      "JWT_SECRET is not defined. Make sure to set it in your environment variables."
    );
  }

  const expiration = Math.floor(Date.now() / 1000) + 12 * 30 * 24 * 60 * 60; // 12 months expiration
  return jwt.sign({ userId, exp: expiration }, secretKey);
};

const verifyToken = (token) => {
  try {
    if (!secretKey) {
      throw new Error(
        "JWT_SECRET is not defined. Make sure to set it in your environment variables."
      );
    }

    const decoded = jwt.verify(token, secretKey);
    if (decoded.exp && Date.now() / 1000 > decoded.exp) {
      throw new Error("Token has expired");
    }
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export default generateToken;
