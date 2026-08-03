const authMiddleware = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
  } else {
    const error = new Error("Token no valido o inexistente");
    res.status(403).json({ msg: error.message });
  }

  next();
};

export default authMiddleware;
