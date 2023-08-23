import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).send("You are not authorized");
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        res.json({ status: "failure" });
        return;
      }
      const user = await User.findById(decode.id);
      if (user) {
        next();
      }
    });
  } catch (erorr) {
    res.status(500).send({
      status: "failure",
      error: erorr.message,
    });
  }
};
