import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export default (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).send({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, secret);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).send("Token is not valid");
  }
};
