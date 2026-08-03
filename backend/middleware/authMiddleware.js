import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      const error = new Error("Token no valido.");
      res.status(403).json({ msg: error.message });
    }
  } else {
    const error = new Error("Token no valido o inexistente");
    res.status(403).json({ msg: error.message });
  }

  next();
};

export default authMiddleware;
