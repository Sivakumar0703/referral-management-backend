import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY;

// hashing the password
export const hashPassword = async (password) => {
  try {
    // check for password
    if (!password) {
      throw new Error("password is not available");
    }
    // if password is available
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("an error occurred in hashing password", error);
    throw new Error("an error occurred in hashing password");
  }
};

// comparing the password
export const compareWithHashedPassword = async (password, hashedPassword) => {
  try {
    // check for password and hashedPassword
    if (!password || !hashedPassword) {
      throw new Error("password/hashedPassword is not available");
    }
    // return the comaprison result
    const comparisonResult = await bcrypt.compare(password, hashedPassword);
    return comparisonResult;
  } catch (error) {
    console.log("an error occurred in password comparison", error);
    throw new Error("an error occurred in password comparison");
  }
};

// create a token
export const generateToken = async (payload) => {
  try {
    if (!payload) {
      throw new Error("payload is missing");
    }
    const token = jwt.sign(payload, secretKey);
    return token;
  } catch (error) {
    console.log("error in generating token", error);
    throw new Error("error in token creation");
  }
};

// verify the token
export const verifyToken = async (token) => {
  try {
    if (!token) {
      throw new Error("token is missing");
    }
    const decode = jwt.verify(token, secretKey);
    const userId = decode._id;
    return userId;
  } catch (error) {
    console.log("error in verifying token", error);
    throw new Error("token verification failed");
  }
};
