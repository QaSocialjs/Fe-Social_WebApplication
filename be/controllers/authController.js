import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, passwordConfirm, role } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(401).send({
        status: "failure",
        message: "User is already exist",
      });
    }

    const newUser = new User({
      name,
      email,
      password,
      passwordConfirm,
      role,
    });

    const saveUser = await newUser.save().then((r) => {
      console.log(r);
    });

    res.status(200).send({
      status: "Register successfully",
      data: {
        user: saveUser,
      },
    });
  } catch (erorr) {
    res.status(500).send({
      status: "failure",
      erorr: erorr.message,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { values } = req.body;
    const email = values.email;
    const password = values.password;
    // const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    console.log(findUser);
    if (!findUser) {
      return res.status(401).send({
        status: "failure",
        message: "User does not exit",
      });
    }
    const isMacth = await bcrypt.compare(password, findUser.password);
    if (!isMacth)
      return res.status(401).send({ message: "Passwords is incorrect" });
    const accesstoken = generateAccessToken(findUser);
    const refreshtoken = generateRefreshToken(findUser);
    await User.findByIdAndUpdate(findUser._id, {
      jwtToken: refreshtoken,
    });

    const { jwtToken, password: newpass, ...other } = findUser._doc;
    console.log(newpass);
    return res.status(200).json({
      status: "Login successfully",
      data: other,
      accesstoken,
      refreshtoken,
    });
  } catch (erorr) {
    return res.status(500).json({
      status: "failure",
      erorr: erorr.message,
    });
  }
};

const parseJwt = (token) => {
  const decode = jwt.decode(token);
  console.log(decode.exp * 1000 - Date.now());
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    res.status(401).send({
      status: "failure",
      message: "You are not authenticated!!",
    });
  }
  try {
    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid" });
      }
      const accesstoken = generateAccessToken(decoded);
      const refreshtoken = generateRefreshToken(decoded);
      await User.updateOne(
        { jwtToken: refreshToken },
        { $set: { jwtToken: refreshtoken } }
      );
      res.status(200).send({
        accesstoken: accesstoken,
        refreshtoken: refreshtoken,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Error refreshing token" });
  }
};
