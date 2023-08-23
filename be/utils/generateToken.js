import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      username: user.username,
      role: user.role,
      id: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export const generateRefreshToken = (user) => {
  console.log(user);
  return jwt.sign(
    {
      username: user.username,
      role: user.role,
      id: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
};
