import jwt from "jsonwebtoken";

export const genToken = async (res, user, roleType) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      roleType,
    },
    process.env.JWT_KEY,
    { expiresIn: "7d" }
  );
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });

  return token;
};
