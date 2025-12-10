// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      return res
        .status(401)
        .send({ message: "Authorization header missing", success: false });
    }

    const parts = authorizationHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res
        .status(401)
        .send({ message: "Invalid Authorization header format", success: false });
    }

    const token = parts[1];

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Token is not valid", success: false });
      } else {
        // attach user id to req for downstream
        req.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};
