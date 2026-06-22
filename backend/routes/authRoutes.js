import express from "express";
import { register, verifyAccount } from "../controllers/authController.js";
const router = express.Router();

//* Auth routes
router.post("/register", register);
router.get("/verify/:token", verifyAccount);

export default router;