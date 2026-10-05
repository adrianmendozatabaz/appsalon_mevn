import express from "express";
import {
  login,
  register,
  verifyAccount,
  user,
  forgotPassword,
  verifyPasswordResetToken,
  updatePassword,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

//* Auth routes
router.post("/register", register);
router.get("/verify/:token", verifyAccount);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password/:token")
  .get(verifyPasswordResetToken)
  .post(updatePassword);

//* Area privada - Requiere JWT
router.get("/user", authMiddleware, user);

export default router;
