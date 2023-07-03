import jwt from "jsonwebtoken";

export const verifedToken = (req, res, next) => {
  const token = req.cookies.social;
  if (!token) return res.status(404).json("Token not Found");

  jwt.verify(token, process.env.JWT, (err, payload) => {
    if (err) return res.status(403).json("Token Not valid");

    req.userId = payload.id;
    next();
  });
};
